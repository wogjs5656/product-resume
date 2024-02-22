import bcrypt from 'bcrypt';

export class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  signUpWithEmail = async (
    email,
    password,
    passwordRe,
    name,
    age,
    gender,
    grade
  ) => {
    if (!email || !password || !passwordRe) {
      throw new Error('이메일과 비밀번호는 필수 값입니다.');
    }

    if (password.length < 6) {
      throw new Error('입력하신 비밀번호가 6자 미만입니다.');
    }

    if (password !== passwordRe) {
      throw new Error('입력하신 비밀번호가 일치하지 않습니다.');
    }

    const isExistUser = await this.userRepository.findUserByEmail(email);
    if (isExistUser) {
      throw new Error('이미 존재하는 이메일입니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userRepository.createUser({
      email,
      password: hashedPassword,
      passwordRe: hashedPassword,
      name,
      age,
      gender,
      grade,
    });

    return {
      email,
      name
    };
  };

  async signInWithClientId(clientId) {
    if (!clientId) {
      throw new Error('클라이언트 ID는 필수 값입니다.');
    }

    const isExistUser = await this.userRepository.findUserByClientId(clientId);
    if (isExistUser) {
      throw new Error('이미 가입된 사용자 입니다.');
    }

    const user = await this.userRepository.createUser({
      clientId,
    });

    return user;
  }

  /** 로그인 API **/
  signInWithEmail = async ({ clientId, email, password }) => {
    const user = await this.userRepository.findUserByEmail(email);

    if (clientId) {
      user = await this.userRepository.findUserByClientId(clientId);
    }
    if (!user) {
      throw {
        code: 401,
        message: '존재하지 않는 이메일입니다.',
      }
    }

    // console.log(user.password);
    if (!(await bcrypt.compare(password, user.password))) {
      throw {
        code: 401,
        message: '비밀번호가 일치하지 않습니다',
      }
    }

    return {
      clientId: user.clientId,
      userId: user.userId,
      email: user.email,
    };
  };

  findMyInfo = async (userId) => {
    const user = await this.userRepository.findMyInfo(userId);
    // 여기에 가공해줘야 인솜니아에 뜸
    return {
      userId: user.userId,
      email: user.email,
      clientId: user.clientId,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      userInfos: {
        select: {
          name: user.userInfos.name,
          age: user.userInfos.age,
          gender: user.userInfos.gender,
        },
      },
    };
  };
}
