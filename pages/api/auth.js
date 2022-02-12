import { authService } from '../../authService';
import db from '../../db';

const authController = {
    async auth(req, res) {
        const { refresh_token } = req.body;
        try {
            const refreshTokenInfo = await authService.validateRefreshToken(refresh_token);

            if(db.users.find(user => (user.id === refreshTokenInfo.sub) && (user.refresh_token === refresh_token))) {
                res.status(200).json({
                    data: {
                        access_token: await authService.generateAccessToken(refreshTokenInfo.sub),
                    }
                });
            }

            throw new Error('Invalid refresh token');
        } catch (err) {
            res.status(401).json({
                status: 401,
                message: 'Invalid refresh token, please login again.',
            });
        }
    },
}

const controllerBy = {
    POST: authController.auth,
}

export default function handle(req, res) {
    if (controllerBy[req.method]) return controllerBy[req.method](req, res);

    res.status(404).json({
        status: 404,
        message: 'Not Found'
    });
}