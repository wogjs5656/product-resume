import express from 'express';
import { prisma } from '../../utils/index.js';
import { ResumeController } from '../controllers/resume.controller.js'; 
import { ResumeService } from '../services/resume.service.js';
import { ResumeRepository } from '../repository/resume.repository.js';
import needSigninMiddleware from '../../middlewares/need-signin.middleware.js';
import bcrypt from 'bcrypt';
const router = express.Router();

const resumeRepository = new ResumeRepository(prisma);
const resumeService = new ResumeService(resumeRepository);
const resumeController = new ResumeController(resumeService);

/** 게시글 작성 API */
router.post('/', needSigninMiddleware, resumeController.createResume);

/** 게시글 모든 조회 API */
router.get('/', needSigninMiddleware, resumeController.getResumes);

router.get('/:resumeId', resumeController.getResume);

router.put('/:resumeId', needSigninMiddleware, resumeController.updateResume);

router.delete('/:resumeId', needSigninMiddleware, resumeController.deleteResume);
export default router;
