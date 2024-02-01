import express from 'express';
import { prisma } from '../models/index.js';
import needSigninMiddleware from '../middlewares/need-signin.middleware.js';
import bcrypt from 'bcrypt';
const router = express.Router();

// model Resume {
//     resumeId Int @id @default(autoincrement()) @map("resumeId")
//     userId Int @map("userId")
//     resumeTitle String @map("resumeTitle")
//     resumeIntro String @db.Text @map("resumeIntro")
//     resumeAuthor String @map("resumeAuthor")
//     resumeStatus ResumeStatus @default(APPLY) @map("resumeStatus")
//     createdAt DateTime @default(now()) @map("createdAt")
//     updatedAt DateTime @updatedAt @map("updatedAt")

//     user Users @relation(fields: [userId], references: [userId], onDelete: Cascade)

//     @@map("Resume")
//   }

router.post('/resumes', needSigninMiddleware, async (req, res, next) => {
  const { userId } = req.user;
  const { resumeTitle, resumeIntro, resumeAuthor } = req.body;

  const resume = await prisma.resume.create({
    data: {
      userId: +userId,
      resumeTitle,
      resumeIntro,
      resumeAuthor,
    },
  });

  return res.status(201).json({ data: resume });
});

// - 이력서 목록은 QueryString으로 order 데이터를 받아서 정렬 방식을 결정합니다.
//     - orderKey, orderValue 를 넘겨받습니다. o
//     - orderValue에 들어올 수 있는 값은 ASC, DESC 두가지 값으로 대소문자 구분을 하지 않습니다. o
//     - ASC는 과거순, DESC는 최신순 그리고 둘 다 해당하지 않거나 값이 없는 경우에는 최신순 정렬을 합니다.
//     - 예시 데이터 : `orderKey=userId&orderValue=desc`

router.get('/resumes', async (req, res, next) => {
  let { orderKey, orderValue } = req.query; 
  
  const resume = await prisma.resume.findMany({
    select: {
      resumeId: true,
      userId: true,
      resumeTitle: true,
      resumeAuthor: true,
      resumeStatus: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      [orderKey || 'createdAt']: orderValue || 'desc',
    }
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
      resumeAuthor: true,
      resumeStatus: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return res.status(200).json({ data: resume });
});

router.put(
  '/resumes/:resumeId',
  needSigninMiddleware,
  async (req, res, next) => {
    const { resumeId } = req.params;
    const { resumeTitle, resumeIntro, resumeStatus } = req.body;

    const resume = await prisma.resume.findUnique({
      where: {
        resumeId: +resumeId,
      },
    });

    if (!resume) {
      return res.status(404).json({ message: '이력서 조회에 실패하였습니다.' });
    }
    if(!resumeStatus) {
      return res.status(400).json({message: '유효하지 않은 상태입니다.'})
    }

    await prisma.resume.update({
      data: {
        resumeTitle: resumeTitle,
        resumeIntro: resumeIntro,
        resumeStatus: resumeStatus,
      },
      where: {
        resumeId: +resumeId,
      },
    });
    return res.status(200).json({ message: '이력서 정보를 수정하였습니다.' });
  }
);

router.delete(
  '/resumes/:resumeId',
  needSigninMiddleware,
  async (req, res, next) => {
    const { resumeId } = req.params;
    const { password } = req.body;
    const { userId } = req.user;

    const resume = await prisma.resume.findUnique({
      where: {
        resumeId: +resumeId,
      },
      select: {
        userId: true,
      },
    });

    if (!resume) {
      return res.status(404).json({ message: '이력서 조회에 실패하였습니다.' });
    }
    if (resume.userId !== userId) {
      return res
        .status(401)
        .json({ message: '해당 이력서에 권한이 없습니다.' });
    }

    const user = await prisma.users.findUnique({
      where: {
        userId: +userId
      },
      select: {
        password: true
      }
    })

    const validPassword = await bcrypt.compare(password, user.password);

    if( !validPassword ) {
      return res.status(401).json({message: '비밀번호가 일치하지 않습니다.'})
    }
    await prisma.resume.delete({
      where: {
        resumeId: +resumeId,
      },
    });
    return res.status(200).json({ message: '이력서를 삭제하였습니다..' });
  }
);
export default router;
