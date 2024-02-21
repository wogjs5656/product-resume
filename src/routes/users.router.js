// src/routes/users.router.js

import express from 'express';
import { prisma } from '../../utils/index.js'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import needSigninMiddleware from '../../middlewares/need-signin.middleware.js';
import { UserController } from '../controllers/user.controller.js';
import { UserService } from '../services/user.service.js';
import { UserRepository } from '../repositories/user.repositorie.js';
const router = express.Router();

const userRepository = new UserRepository(prisma);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

/** 사용자 회원가입 API **/
router.post('/sign-up', userController.signUpWithEmail);

/** 로그인 API **/
router.post('/sign-in', userController.signInWithEmail);

// 내 정보 조회
router.get('/', needSigninMiddleware, userController.findMyInfo);

export default router;
