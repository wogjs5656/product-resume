import { beforeEach, describe, expect, jest } from '@jest/globals';
import { ResumeController } from '../../../src/controllers/resume.controller.js';

const mockResumeService = {
  createResume: jest.fn(),
  findAllResume: jest.fn(),
  findDeResume: jest.fn(),
  updateResume: jest.fn(),
  deleteResume: jest.fn(),
};

const mockRequest = {
  body: jest.fn(),
  query: jest.fn(),
};

const mockResponse = {
  status: jest.fn(),
  json: jest.fn(),
};

const mockNext = jest.fn();

// postsController의 Service를 Mock Service로 의존성을 주입합니다.
const resumeController = new ResumeController(mockResumeService);

describe('Resume Controller Unit Test', () => {
  beforeEach(() => {
    jest.resetAllMocks();

    mockResponse.status.mockReturnValue(mockResponse);
  });
  
  test('getResumes Method by Success', async () => {
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
      
      mockResumeService.findAllResume.mockReturnValue(smapleResume);
      
      await resumeController.getResumes(mockRequest, mockResponse, mockNext);

      expect(mockResponse.status).toHaveBeenCalledTimes(1);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        data: smapleResume,
      })
  })


});
