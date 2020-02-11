import { IEvidenceRepository } from '@repos/evidence.repository';
import { IEvidenceService } from '../interfaces/evidence.interface';
import { injectable, inject } from 'inversify';
import { TYPES } from 'shared/constants/Types';
import { Evidence } from '@models/evidence';
@injectable()
export class EvidenceService implements IEvidenceService {
  protected evidenceRepository: IEvidenceRepository;
  constructor(
    @inject(TYPES.EvidenceRepository)
    _knowledgeAreaRepository: IEvidenceRepository,
  ) {
    this.evidenceRepository = _knowledgeAreaRepository;
  }

  async getEvidenceByProjectIdAndQuestionId(
    productId: number,
    questionId: number,
  ) {
    return await this.evidenceRepository.getEvidenceByProjectIdAndQuestionId(
      productId,
      questionId,
    );
  }

  async addEvidenceByQuestionId(questionId: number, evidence: Evidence) {
    return await this.evidenceRepository.addEvidenceByQuestionId(
      questionId,
      evidence,
    );
  }

  async updateStatus(evidenceId: number, status: string) {
    return await this.evidenceRepository.updateStatus(evidenceId, status);
  }
}
