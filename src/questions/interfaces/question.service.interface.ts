import { Question } from '@models/question';

export interface IQuestionService {
  getQuestionsByKnowledgeArea(knowledgeAreaId: number): Promise<Question[]>;
}
