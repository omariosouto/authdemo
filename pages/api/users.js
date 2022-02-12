import { v4 as uuid } from 'uuid';
import db from '../../db';

const userController = {
    getAll(_, res) {
        res.status(200).json({
            data: {
                users: db.users,
            }
        });
    },
    create(req, res) {
        const newUser = {
            id: uuid(),
            username: req.body.username,
            password: req.body.password,
        };
        
        if(db.users.find((user) => user.username === newUser.username)) {
            return res.status(400).json({
                status: 400,
                message: 'User already exists'
            });
        }
        
        db.users.push(newUser);

        res.status(201).json({
            data: {
                user: newUser,
            }
        });
    }
}


const controllerBy = {
    GET: userController.getAll,
    POST: userController.create,
}

export default function handle(req, res) {
    if(controllerBy[req.method]) return controllerBy[req.method](req, res);
    
    res.status(404).json({
        status: 404,
        message: 'Not Found'
    }); 
}