import express from 'express';
import { prisma } from '../models/index.js';
import needSigninMiddleware from '../middlewares/need-signin.middleware.js';

const router = express.Router();

// model Resume {
//     resumeId Int @id @default(autoincrement()) @map("resumeId")
//     userId Int @map("userId")
//     resumeTitle String @map("resumeTitle")
//     resumeIntro String @db.Text @map("resumeIntro")
//     resumeName String @map("resumeName")
//     resumeStatus ResumeStatus @default(APPLY) @map("resumeStatus")
//     createdAt DateTime @default(now()) @map("createdAt")
//     updatedAt DateTime @updatedAt @map("updatedAt")

//     user Users @relation(fields: [userId], references: [userId], onDelete: Cascade)

//     @@map("Resume")
//   }

router.post('/resumes', needSigninMiddleware, async (req, res, next) => {
  const { userId } = req.user;
  const { resumeTitle, resumeIntro, resumeName } = req.body;

  const resume = await prisma.resume.create({
    data: {
      userId: +userId,
      resumeTitle,
      resumeIntro,
      resumeName,
    },
  });

  return res.status(201).json({ data: resume });
});

router.get('/resumes', async (req, res, next) => {
  const resume = await prisma.resume.findMany({
    select: {
      resumeId: true,
      userId: true,
      resumeTitle: true,
      resumeName: true,
      resumeStatus: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return res.status(200).json({ data: resume });
});

router.get('/resumes/:resumeId', async (req, res, next) => {
  const { resumeId } = req.params;
  const resume = await prisma.resume.findFirst({
    where: {
      resumeId: +resumeId,
    },
    select: {
      resumeId: true,
      userId: true,
      resumeTitle: true,
      resumeIntro: true,
      resumeName: true,
      resumeStatus: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return res.status(200).json({ data: resume });
});

export default router;
