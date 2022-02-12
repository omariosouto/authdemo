import db from '../../db';
import { authService } from '../../authService';

export default async function handler(req, res) {
    const { username, password } = req.body;

    const user = db.users.find((user) => user.username === username && user.password === password);

    if(!user) res.status(401).json({ message: 'Username or password are invalid' });

    
    const access_token = await authService.generateAccessToken(user.id);
    const refresh_token = await authService.generateRefreshToken(user.id);
    user.refresh_token = refresh_token;

    res.json({
        access_token,
        refresh_token,
    });
}