export class ResumeRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  createResume = async (userId, resumeTitle, resumeIntro, resumeAuthor) => {
    const createdResume = await this.prisma.resume.create({
      data: {
        userId: +userId,
        resumeTitle,
        resumeIntro,
        resumeStatus: 'APPLY',
        resumeAuthor,
      },
    });
    return createdResume;
  };

  findAllResume = async (orderKey, orderValue) => {
    const resumes = await this.prisma.resume.findMany({
      select: {
        resumeId: true,
        userId: true,
        resumeTitle: true,
        resumeAuthor: true,
        resumeStatus: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: [
        {
          [orderKey]: orderValue,
        },
      ],
    });

    return resumes;
  };

  /** 게시글 상세 조회 */
  findDeResume = async (resumeId) => {
    const resumes = await this.prisma.resume.findFirst({
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
    return resumes;
  };

  findResumeById = async (resumeId) => {
    const resumes = await this.prisma.resume.findUnique({
      where: {
        resumeId: +resumeId,
      },
    });
    return resumes;
  };

  findResumeUnique = async (
    resumeId,
    resumeTitle,
    resumeIntro,
    resumeStatus
  ) => {
    const updateResume = await this.prisma.resume.update({
      where: {
        resumeId: +resumeId,
      },
      data: {
        resumeTitle,
        resumeIntro,
        resumeStatus,
      },
    });
    return updateResume;
  };

  deleteResume = async (resumeId) => {
    const deletedResume = await this.prisma.resume.delete({
      where: { resumeId: +resumeId },
    });

    return deletedResume;
  };
}
