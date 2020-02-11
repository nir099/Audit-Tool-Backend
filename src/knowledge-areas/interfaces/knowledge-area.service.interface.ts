import { KnowledgeArea } from '@models/knowledge-area';

export interface IKnowledgeAreaService {
  getKnowledgeAreaByPhase(phaseId: number): Promise<KnowledgeArea[]>;
}
