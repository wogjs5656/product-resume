import express from 'express';
import ResumeRouter from './resume.router.js';
import UsersRouter from './users.router.js';
import AuthRouter from './auth.router.js';

const router = express.Router();

router.use('/resumes', ResumeRouter);
router.use('/users', UsersRouter);
router.use('/auth',AuthRouter);

export default router;
