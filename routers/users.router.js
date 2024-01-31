// src/routes/users.router.js

import express from 'express';
import { prisma } from '../models/index.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import needSigninMiddleware from '../middlewares/need-signin.middleware.js';
const router = express.Router();

/** 사용자 회원가입 API **/
router.post('/sign-up', async (req, res, next) => {
  const { email, password, passwordRe, name, age, gender } = req.body;
  const isExistUser = await prisma.users.findFirst({
    where: {
      email,
    },
  });

  if (isExistUser) {
    return res.status(409).json({ message: '이미 존재하는 이메일입니다.' });
  }

  if (password.length < 6) {
    return res.status(401).json({
      message: '입력하신 비밀번호가 6자 미만입니다',
    });
  }

  if (password !== passwordRe) {
    return res.status(401).json({
      message: '입력하신 비밀번호가 일치하지 않습니다',
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // Users 테이블에 사용자를 추가합니다.
  const user = await prisma.users.create({
    data: {
      email,
      password: hashedPassword,
      passwordRe: password,
    },
  });

  // UserInfos 테이블에 사용자 정보를 추가합니다.
  const userInfo = await prisma.userInfos.create({
    data: {
      userId: user.userId, // 생성한 유저의 userId를 바탕으로 사용자 정보를 생성합니다.
      name,
      age,
      gender: gender.toUpperCase(), // 성별을 대문자로 변환합니다.
    },
  });

  return res.status(201).json({ message: '회원가입이 완료되었습니다.' });
});

/** 로그인 API **/

router.post('/sign-in', async (req, res, next) => {
  const { email, password } = req.body;
  const user = await prisma.users.findFirst({
    where: { email },
  });
  if (!user)
    return res.status(401).json({ message: '존재하지 않는 이메일입니다.' });
  // 입력받은 사용자의 비밀번호와 데이터베이스에 저장된 비밀번호를 비교합니다.
  else if (!(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ message: '비밀번호가 일치하지 않습니다.' });

  const token = jwt.sign(
    {
      userId: user.userId,
    },
    'custom-secret-key'
  );

  res.cookie('authorization', `Bearer ${token}`);
  return res.status(201).json({ message: '로그인 성공' });
});

router.get('/users', needSigninMiddleware, async (req, res, next) => {
  const { userId } = req.user;

  const user = await prisma.users.findFirst({
    where: { userId: +userId },
    select: {
      userId: true,
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
  return res.status(200).json({ data: user });
});

export default router;
