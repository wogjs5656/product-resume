// __tests__/unit/posts.repository.unit.spec.js

import { jest } from '@jest/globals';
import { ResumeRepository } from '../../../src/repository/resume.repository.js';

// Prisma 클라이언트에서는 아래 5개의 메서드만 사용합니다.
let mockPrisma = {
  resume: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

let resumeRepository = new ResumeRepository(mockPrisma);

describe('Posts Repository Unit Test', () => {
  // 각 test가 실행되기 전에 실행됩니다.
  beforeEach(() => {
    jest.resetAllMocks(); // 모든 Mock을 초기화합니다.
  });

  test('createResume Method', async () => {
    const mockReturn = 'create Return string';
    mockPrisma.resume.create.mockReturnValue(mockReturn);
  
    const createResumeParams = {
      userId: userId,
      resumeTitle: resumeTitle,
      resumeIntro: resumeIntro,
      resumeStatus: 'APPLY',
      resumeAuthor: resumeAuthor,
    };
    const createResumeData = await resumeRepository.createResume(
      createResumeParams.userId,
      createResumeParams.resumeTitle,
      createResumeParams.resumeIntro,
      createResumeParams.resumeStatus,
      createResumeParams.resumeAuthor
    );
    expect(createResumeData).toBe(mockReturn);
    expect(mockPrisma.resume.create).toHaveBeenCalledTimes(1);
    expect(mockPrisma.resume.create).toHaveBeenCalledWith({
      data: createResumeParams,
    });
  });
  

  test('findAllResume Method', async () => {
    const mockReturn = 'findMany String';
    mockPrisma.resume.findMany.mockReturnValue(mockReturn);

    const resume = await resumeRepository.findAllResume();

    expect(resumeRepository.prisma.resume.findMany).toHaveBeenCalledTimes(1);
    expect(resume).toBe(mockReturn);
  });

  test('createPost Method', async () => {
    // TODO: 여기에 코드를 작성해야합니다.
  });

});
