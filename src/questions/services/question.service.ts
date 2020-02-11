import { TYPES } from 'shared/constants/Types';
import { IQuestionRepository } from '@repos/question.repository';
import { IQuestionService } from 'questions/interfaces/question.service.interface';
import { injectable, inject } from 'inversify';

@injectable()
export class QuestionService implements IQuestionService {
  protected questionRepository: IQuestionRepository;

  constructor(
    @inject(TYPES.QuestionRepository) _questionRepository: IQuestionRepository,
  ) {
    this.questionRepository = _questionRepository;
  }

  async getQuestionsByKnowledgeArea(knowledgeAreaId: number) {
    return await this.questionRepository.getQuestionsByKnowledgeAreaId(
      knowledgeAreaId,
    );
  }
}
