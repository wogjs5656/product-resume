import { UserService } from '../services/user.service.js';
import { createAccessToken, createRefreshToken } from '../../utils/token.js';

export class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  /** 사용자 회원가입 API **/
  signUpWithEmail = async (req, res, next) => {
    try {
      const { email, password, passwordRe, name, age, gender, grade } =
        req.body;

        if (!email || !password || !passwordRe) {
          return res.status(401).json({message: '이메일과 비밀번호는 필수 값입니다.'})
        }

        if (password.length < 6) {
          return res.status(401).json({message: '입력하신 비밀번호가 6자 미만입니다.'})
        }
    
        if (password !== passwordRe) {
          return res.status(401).json({message: '입력하신 비밀번호가 일치하지 않습니다.'})
        }

         
    const isExistUser = await this.userService.userRepository.findUserByEmail(email);
 
        if (isExistUser) {
          return res.status(401).json({message: '이미 존재하는 이메일 입니다.'})
        }
    

      const emailUser = await this.userService.signUpWithEmail(
        email,
        password,
        passwordRe,
        name,
        age,
        gender,
        grade
      );
      return res
        .status(200)
        .json({ message: '회원가입이 완료되었습니다.', data: emailUser });
    } catch (err) {
      next(err);
    }
  };

  // signUpWithClientId = async (req, res, next) => {
  //   try {
  //     const { clientId, name, age, gender, grade } = req.body;
  //     const user = await this.userService.signUpWithClientId(
  //       clientId,
  //       name,
  //       age,
  //       gender,
  //       grade
  //     );
  //     return res
  //       .status(200)
  //       .json({ message: '회원가입이 완료되었습니다.', data: user });
  //   } catch (err) {
  //     next(err);
  //   }
  // };

  signInWithEmail = async (req, res, next) => {
    try {
      const { clientId, email, password } = req.body;

      const user = await this.userService.signInWithEmail({
        clientId,
        email,
        password,
      });

      const accessToken = createAccessToken(user.userId);
      const refreshToken = createRefreshToken(user.userId);

      res.cookie('accessToken', `Bearer ${accessToken}`);
      res.cookie('refreshToken', `Bearer ${refreshToken}`);

      return res.status(201).json({ accessToken, refreshToken });
    } catch (err) {
      next(err);
    }
  };

  findMyInfo = async (req, res, next) => {
    try {
      const { userId } = req.user;
      const user = await this.userService.findMyInfo(userId);

      return res.status(200).json({ data: user });
    } catch (err) {
      next(err);
    }
  };
}
