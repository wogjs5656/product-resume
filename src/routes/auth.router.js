import express from 'express';
import { AuthController } from '../controllers/auth.controller.js';
import { AuthService } from '../services/auth.service.js';
import { UserRepository } from '../repository/user.repository.js';

const router = express.Router();

const userRepository = new UserRepository;
const authService = new AuthService;
const authController = new AuthController;

router.post('/token', authController.generateNewAccessTokenByFreshToken);
export default router;


// router.post('/token', async (req, res) => {
//     const { refreshToken } = req.body;

//     const token = jwt.verify(refreshToken, 'refresh-key');
//     if(!token.userId) {
//         return res.status(401).json({message: "권한이 없습니다."})
//     }

//     const user = await prisma.users.findFirst({
//        where: {
//         userId: token.userId
//        }
//     })
//     if(!user) {
//         return res.status(401).json({message: "권한이 없습니다."})
//     }
//     // refreshToken 유효함  -> accessToken, refreshToken 재발급
//     const newAccessToken = jwt.sign({ userId: user.userId}, 'custom-secret-key', {expiresIn: '12h',});
//     const newRefreshToken = jwt.sign({ userId: user.userId}, 'refresh-key', {expiresIn: '7d',});   

//     return res.json({
//         accessToken: newAccessToken,
//         refreshToken: newRefreshToken,
//     })
// })