import { authService } from '../../authService';
import db from '../../db';

const videosController = {
    async getAll(req, res) {
        if (!await authService.isAuthenticated(req, res)) return res.status(401).json({
            status: 401,
            message: 'Unauthorized'
        });

        res.status(200).json({
            data: {
                users: db.videos,
            }
        });
    },
}

const controllerBy = {
    GET: videosController.getAll,
}

export default function handle(req, res) {
    if (controllerBy[req.method]) return controllerBy[req.method](req, res);

    res.status(404).json({
        status: 404,
        message: 'Not Found'
    });
}