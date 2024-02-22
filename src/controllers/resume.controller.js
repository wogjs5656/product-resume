import { ResumeService } from '../services/resume.service.js';

export class ResumeController {
  constructor(resumeService) {
    this.resumeService = resumeService;
  }
  /** 게시물 게시 API  */
  createResume = async (req, res, next) => {
    try {
      const { userId } = req.user;
      const { resumeTitle, resumeIntro, resumeAuthor } = req.body;

      if (!resumeTitle) {
        return res
          .status(400)
          .json({ message: '이력서 제목은 필수 값 입니다.' });
      }

      if (!resumeIntro) {
        return res.status(400).json({ message: '자기소개는 필수 값 입니다.' });
      }

      const createdResume = await this.resumeService.createResume(
        userId,
        resumeTitle,
        resumeIntro,
        resumeAuthor
      );
      return res.status(201).json({ data: createdResume });
    } catch (err) {
      next(err);
    }
  };

  /** 게시물 전체조회 API */
  getResumes = async (req, res, next) => {
    try {
      const orderKey = req.query.orderKey ?? 'resumeId';
      const orderValue = req.query.orderValue ?? 'desc';

      if (!['resumeId', 'status'].includes(orderKey)) {
        return res
          .status(400)
          .json({ message: 'orderkey가 올바르지 않습니다.' });
      }

      if (!['asc', 'desc'].includes(orderValue.toLowerCase())) {
        return res
          .status(400)
          .json({ message: 'orderValue가 올바르지 않습니다.' });
      }

      const resumes = await this.resumeService.findAllResume(
        orderKey,
        orderValue
      );
      return res.status(200).json({ data: resumes });
    } catch (error) {
      next(error);
    }
  };

  getResume = async (req, res, next) => {
    try {
      const { resumeId } = req.params;
      if (!resumeId) {
        return res.status(400).json({ message: 'resumeId는 필수 값입니다.' });
      }

      const resume = await this.resumeService.findDeResume(resumeId);

      if(!resume) {
        return res.json({data: {}})
      }
      return res
        .status(200)
        .json({ message: '상세 정보를 조회하였습니다.', data: resume });
    } catch (err) {
      next(err);
    }
  };

  updateResume = async (req, res, next) => {
    try {
      const { userId } = req.user;
      const { resumeId } = req.params;
      const { resumeTitle, resumeIntro, resumeStatus } = req.body;

      const updatedResume = await this.resumeService.updateResume(
        userId,
        resumeId,
        resumeTitle,
        resumeIntro,
        resumeStatus
      );

      return res.status(201).json({ data: updatedResume });
    } catch (error) {
      next(error);
    }
  };

  deleteResume = async (req, res, next) => {
    try {
      const { resumeId } = req.params;
      const userId = req.user.userId;

      if (!resumeId) {
        return res.status(400).json({ message: 'resumeId는 필수값입니다.' });
      }

      const result = await this.resumeService.deleteResume(resumeId, userId);
      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };
}
