import jwt from 'jsonwebtoken';

export const authService = {
    ACCESSTOKEN_SECRET: 'BIRDMAN',
    async generateAccessToken(userId) {
        return await jwt.sign(
            { roles: ['user'] },
            authService.ACCESSTOKEN_SECRET,
            { subject: userId, expiresIn: '20s' }
        );
    },
    async validateAccessToken(accessToken) {
        return await jwt.verify(accessToken, authService.ACCESSTOKEN_SECRET);
    },
    async isAuthenticated(req) {
        const token = req.headers.authorization.split(' ')[req.headers.authorization.split(' ').length - 1];
    
        try {
            await authService.validateAccessToken(token);
            return true;
        } catch (err) {   
            return false;
        }
    },
    REFRESHTOKEN_SECRET: 'REFRESHERS',
    async generateRefreshToken(userId) {
        return await jwt.sign(
            {},
            authService.REFRESHTOKEN_SECRET,
            { subject: userId, expiresIn: '7d' }
        );
    },
    async validateRefreshToken(refreshToken) {
        return await jwt.verify(refreshToken, authService.REFRESHTOKEN_SECRET);
    },
    async decodeToken(token) {
        return await jwt.decode(token);
    }
}