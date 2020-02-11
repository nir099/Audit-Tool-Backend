import { KnowledgeAreaService } from './src/knowledge-areas/services/knowledge-area.service';
import { TYPES } from 'shared/constants/Types';
import { IProductService } from 'products/interfaces/product.service.interface';
import { IQuestionService } from '@questions/interfaces/question.service.interface';
import { ConsoleLogger } from './src/shared/concrete/util/console.logger';
import { ILogger } from './src/shared/abstract/util/logger';
import { Container } from 'inversify';
import { IOrganizationRepository } from './src/shared/abstract/repos/organization.repository.interface';
import { IProductRepository } from './src/shared/abstract/repos/product.repository.interface';
import { IPhaseRepository } from './src/shared/abstract/repos/phase.repository.interface';
import { IKnowledgeAreaRepository } from './src/shared/abstract/repos/knowledge-area.repository';
import { IQuestionRepository } from './src/shared/abstract/repos/question.repository';
import { MySQLProductRepository } from './src/shared/concrete/repos/mysql/product.repository';
import { MySQLOrganizationRepository } from './src/shared/concrete/repos/mysql/organization.repository';
import { MYSQLPhaseRepository } from './src/shared/concrete/repos/mysql/phase.repository';
import { MySQLKnowledgeAreaRepository } from './src/shared/concrete/repos/mysql/knowledge-area.repository';
import { MySQLQuestionRepository } from './src/shared/concrete/repos/mysql/question.repository';
import { ProductService } from '@products/services/product.service';
import { QuestionService } from '@questions/services/question.service';
import { IKnowledgeAreaService } from 'knowledge-areas/interfaces/knowledge-area.service.interface';
import { IEvidenceService } from 'evidence/interfaces/evidence.interface';
import { EvidenceService } from 'evidence/services/evidence.service';
import { IOrganizationService } from 'organizations/interfaces/organization.service.interface';
import { OrganizationService } from 'organizations/services/organization.service';
import { IEvidenceRepository } from '@repos/evidence.repository';
import { MySQLEvidenceRepository } from 'shared/concrete/repos/mysql/evidence.repository';
import { IUserRepository } from '@repos/user.repository.interface';
import { MySQLUserRepository } from 'shared/concrete/repos/mysql/user.repository';
import { IUserService } from 'users/interfaces/user.service.interface';
import { UserService } from 'users/services/user.service';

export class Inversify extends Container {
  constructor() {
    super();
    this.initializeDependencies();
  }

  initializeDependencies() {
    this.bind<ILogger>(TYPES.Logger).to(ConsoleLogger);

    this.bind<IOrganizationRepository>(TYPES.OrganizationRepository).to(
      MySQLOrganizationRepository,
    );

    this.bind<IProductRepository>(TYPES.ProductRepository).to(
      MySQLProductRepository,
    );
    this.bind<IPhaseRepository>(TYPES.PhaseRepository).to(MYSQLPhaseRepository);
    this.bind<IKnowledgeAreaRepository>(TYPES.KnowledgeAreaRepository).to(
      MySQLKnowledgeAreaRepository,
    );

    this.bind<IEvidenceRepository>(TYPES.EvidenceRepository).to(
      MySQLEvidenceRepository,
    );

    this.bind<IQuestionRepository>(TYPES.QuestionRepository).to(
      MySQLQuestionRepository,
    );

    this.bind<IUserRepository>(TYPES.UserRepository).to(MySQLUserRepository);
  }

  getProductService() {
    return this.resolve<IProductService>(ProductService);
  }

  getKnowledgeAreaService() {
    return this.resolve<IKnowledgeAreaService>(KnowledgeAreaService);
  }

  getEvidenceService() {
    return this.resolve<IEvidenceService>(EvidenceService);
  }

  getQuestionService() {
    return this.resolve<IQuestionService>(QuestionService);
  }

  getOrganizationService() {
    return this.resolve<IOrganizationService>(OrganizationService);
  }

  getUserService() {
    return this.resolve<IUserService>(UserService);
  }

  getLogger() {
    return this.get<ILogger>(TYPES.Logger);
  }

  destroyContainer() {
    this.unbindAll();
  }
}
