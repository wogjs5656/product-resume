import { prisma } from '../../utils/index.js';

export class UserRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async findOneUserByUserId(userId) {
    const user = await prisma.users.findFirst({
      where: {
        userId,
      },
    });
    return user;
  }

  async findUserByEmail(email) {
    const user = await this.prisma.users.findUnique({
      where: {
        email: email,
      },
    });
    return user;
  }

  async findUserByClientId(clientId) {
    const user = await this.prisma.users.findFirst({
      where: {
        clientId,
      },
    });
    return user;
  }

  async createUser(userData) {
    const { email, password, grade, name, age, gender } = userData;
    const createdUser = await this.prisma.users.create({
      data: {
        email,
        password,
        grade,
        userInfos: {
          create: {
            name,
            age,
            gender,
          },
        },
      },
    });
    return createdUser;
  }

  async findMyInfo(userId) {
    const user = await this.prisma.users.findFirst({
      where: { userId: +userId },
      select: {
        userId: true,
        clientId: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        userInfos: {
          select: {
            name: true,
            age: true,
            gender: true,
          },
        },
      },
    });
    return user;
  }
}
