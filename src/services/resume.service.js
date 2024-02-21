import { ResumeRepository } from '../repository/resume.repository.js';

export class ResumeService {
  constructor(resumeRepository) {
    this.resumeRepository = resumeRepository;
  }
  /** 게시글 작성 API */
  createResume = async (userId, resumeTitle, resumeIntro, resumeAuthor) => {
    return await this.resumeRepository.createResume(
      userId,
      resumeTitle,
      resumeIntro,
      resumeAuthor
    );
  };

  /** 게시글 조회 API */
  findAllResume = async (orderKey, orderValue) => {
    const resumes = await this.resumeRepository.findAllResume(
      orderKey,
      orderValue
    );
    return resumes;
  };

  findDeResume = async (resumeId) => {
    const resume = await this.resumeRepository.findDeResume(resumeId);
    return resume;
  };

  updateResume = async (
    userId,
    resumeId,
    resumeTitle,
    resumeIntro,
    resumeStatus
  ) => {
    const resume = await this.resumeRepository.findResumeById(resumeId);

    if (userId !== resume.userId) {
      throw new Error('해당 이력서에 권한이 없습니다.');
    }

    const updatedResume = await this.resumeRepository.findResumeUnique(
      resumeId,
      resumeTitle,
      resumeIntro,
      resumeStatus
    );
    return {
      resumeTitle: resume.resumeTitle,
      resumeIntro: resume.resumeIntro,
      resumeStatus: resume.resumeStatus,
    };
  };

  deleteResume = async (resumeId, userId) => {
    const resume = await this.resumeRepository.findResumeById(resumeId);
    if (!resume) {
      throw new Error('이력서 조회에 실패하였습니다.');
    }
    if (userId !== resume.userId) {
      throw new Error('해당 이력서에 권한이 없습니다.');
    }
    await this.resumeRepository.deleteResume(resumeId);
    return { message: '이력서를 삭제하였습니다.' };
  };
}
