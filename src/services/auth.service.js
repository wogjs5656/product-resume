import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/user.repositorie.js';

export class AuthService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  verifyFreshToken = async (refreshToken) => {
    const token = jwt.verify(refreshToken, 'refresh-key');
    if (!token.userId) {
      throw {
        code: 401,
        message: '토큰 정보가 올바르지 않습니다.',
      };
    }

    const user = await findOneUserByUserId(token.userId);

    if (!user) {
      throw {
        code: 401,
        message: '토큰 정보가 올바르지 않습니다.',
      };
    }

    // refreshToken 유효함  -> accessToken, refreshToken 재발급
    const newAccessToken = jwt.sign(
      { userId: user.userId },
      'custom-secret-key',
      { expiresIn: '12h' }
    );
    const newRefreshToken = jwt.sign({ userId: user.userId }, 'refresh-key', {
      expiresIn: '7d',
    });

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  };
}
