// src/app.js

import express from 'express';
import cookieParser from 'cookie-parser';
import UsersRouter from './routers/users.router.js';
import ResumRouter from './routers/resume.router.js'
import AuthRouter from './routers/auth.router.js';
import dotenv from 'dotenv'

dotenv.config();

const app = express();
const PORT = 3020;

app.use(express.json());
app.use(cookieParser());
app.use('/api', [UsersRouter,ResumRouter,AuthRouter]);


app.listen(PORT, () => {
  console.log(PORT, '포트로 서버가 열렸어요!');
});
