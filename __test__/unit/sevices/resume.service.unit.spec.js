// __tests__/unit/posts.service.unit.spec.js

import { jest } from '@jest/globals';
import { ResumeService } from '../../../src/services/resume.service.js';

// PostsRepository는 아래의 5개 메서드만 지원하고 있습니다.
let mockResumeRepository = {
  createResume: jest.fn(),
  findAllResume: jest.fn(),
  findDeResume: jest.fn(),
  findResumeById: jest.fn(),
  findResumeUnique: jest.fn(),
  deleteResume: jest.fn(),
};

// postsService의 Repository를 Mock Repository로 의존성을 주입합니다.
let resumeService = new ResumeService(mockResumeRepository);

describe('Resume Service Unit Test', () => {
  // 각 test가 실행되기 전에 실행됩니다.
  beforeEach(() => {
    jest.resetAllMocks(); // 모든 Mock을 초기화합니다.
  });

  test('findAllResume Method', async () => {
    const smapleResume = [
      {
        resumeId: 28,
        userId: 19,
        resumeTitle: '해치웠나??',
        resumeAuthor: '자재링딩',
        resumeStatus: 'APPLY',
        createdAt: new Date('06 October 2011 15:50 UTC'),
        updatedAt: new Date('06 October 2011 15:50 UTC'),
      },
      {
        resumeId: 27,
        userId: 18,
        resumeTitle: '이력서 제목 ',
        resumeAuthor: '자재링딩',
        resumeStatus: 'INTERVIEW1',
        createdAt: new Date('06 October 2011 17:50 UTC'),
        updatedAt: new Date('06 October 2011 17:50 UTC'),
      },
    ];
    mockResumeRepository.findAllResume.mockReturnValue(smapleResume);

    const allResume = await resumeService.findAllResume();

    expect(allResume).toEqual(smapleResume);
    expect(mockResumeRepository.findAllResume).toHaveBeenCalledTimes(1);
  });

  test('deletePost Method By Success', async () => {
    // TODO: 여기에 코드를 작성해야합니다.
  });

  test('deletePost Method By Not Found Post Error', async () => {
    // TODO: 여기에 코드를 작성해야합니다.
  });
});
