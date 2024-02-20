import express from 'express';
import { prisma } from '../../models/index.js';
import jwt from 'jsonwebtoken';
const router = express.Router();

router.post('/token', async (req, res) => {
    const { refreshToken } = req.body;

    const token = jwt.verify(refreshToken, 'refresh-key');
    if(!token.userId) {
        return res.status(401).json({message: "권한이 없습니다."})
    }

    const user = await prisma.users.findFirst({
       where: {
        userId: token.userId
       }
    })
    if(!user) {
        return res.status(401).json({message: "권한이 없습니다."})
    }
    // refreshToken 유효함  -> accessToken, refreshToken 재발급
    const newAccessToken = jwt.sign({ userId: user.userId}, 'custom-secret-key', {expiresIn: '12h',});
    const newRefreshToken = jwt.sign({ userId: user.userId}, 'refresh-key', {expiresIn: '7d',});   

    return res.json({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
    })
})
export default router;
