import { IProductService } from './products/interfaces/product.service.interface';
import API from 'lambda-api';
import 'source-map-support/register';
import { IKnowledgeAreaService } from 'knowledge-areas/interfaces/knowledge-area.service.interface';
import { injectable } from 'inversify';
import { IEvidenceService } from 'evidence/interfaces/evidence.interface';
import { IQuestionService } from '@questions/interfaces/question.service.interface';
import { Evidence } from '@models/evidence';
import { IUserService } from 'users/interfaces/user.service.interface';
import { IOrganizationService } from 'organizations/interfaces/organization.service.interface';

@injectable()
export class Routes {
  private path = API({ version: 'v1.0', logger: true });
  private productService: IProductService;
  private knowledgeAreaService: IKnowledgeAreaService;
  private evidenceService: IEvidenceService;
  private questionService: IQuestionService;
  private userService: IUserService;

  constructor(
    _knowledgeAreaService: IKnowledgeAreaService,
    _productService: IProductService,
    _evidenceService: IEvidenceService,
    _questionService: IQuestionService,
    _userService: IUserService,
    _organizationService: IOrganizationService,
  ) {
    this.productService = _productService;
    this.knowledgeAreaService = _knowledgeAreaService;
    this.evidenceService = _evidenceService;
    this.productService = _productService;
    this.knowledgeAreaService = _knowledgeAreaService;
    this.questionService = _questionService;
    this.userService = _userService;
    this.initiateApi();
  }
  initiateApi() {
    this.path.get('products/user/:id', async (req, _res) => {
      const userId = Number(req.pathParameters ? req.pathParameters.id : null);
      return await this.productService.getProductsByUser(userId);
    });

    this.path.get('products/:id', async (req, _res) => {
      const productId = Number(
        req.pathParameters ? req.pathParameters.id : null,
      );
      return await this.productService.getProductById(productId);
    });

    this.path.get('products/:id/phases', async (req, _res) => {
      const productId = Number(
        req.pathParameters ? req.pathParameters.id : null,
      );
      return await this.productService.getPhases(productId);
    });

    this.path.get('products/productPhases/:id', async (req, _res) => {
      const productId = Number(
        req.pathParameters ? req.pathParameters.id : null,
      );
      return await this.productService.getProductByProductPhaseId(productId);
    });

    this.path.get('productPhase/:id/knowledgeAreas', async (req, _res) => {
      const productId = Number(
        req.pathParameters ? req.pathParameters.id : null,
      );
      return await this.knowledgeAreaService.getKnowledgeAreaByPhase(productId);
    });

    this.path.get('product/:id/questions/:qid/evidence', async (req, _res) => {
      const productId = Number(
        req.pathParameters ? req.pathParameters.id : null,
      );
      const questionId = Number(
        req.pathParameters ? req.pathParameters.qid : null,
      );
      return await this.evidenceService.getEvidenceByProjectIdAndQuestionId(
        productId,
        questionId,
      );
    });
    this.path.get('knowledgeAreas/:id/questions', async (req, _res) => {
      const knowledgeAreaId = Number(
        req.pathParameters ? req.pathParameters.id : null,
      );
      return await this.questionService.getQuestionsByKnowledgeArea(
        knowledgeAreaId,
      );
    });

    this.path.post('question/:id/evidence', async (req, _res) => {
      const questionId = Number(
        req.pathParameters ? req.pathParameters.id : null,
      );
      const evidence: Evidence = req.body;
      return await this.evidenceService.addEvidenceByQuestionId(
        questionId,
        evidence,
      );
    });

    this.path.put('question/:id/evidence/:eid', async (req, _res) => {
      const qevidenceId = Number(
        req.pathParameters ? req.pathParameters.eid : null,
      );
      const status: string = req.body.status;
      return await this.evidenceService.updateStatus(qevidenceId, status);
    });

    this.path.get('user/email/:id', async (req, _res) => {
      const email = req.pathParameters ? req.pathParameters.id : '';
      return await this.userService.getOrganizationByUserEmail(email);
    });

    this.path.get('user/product/:id', async (req, _res) => {
      const productId = Number(
        req.pathParameters ? req.pathParameters.id : null,
      );
      return await this.userService.getUsersByProjectId(productId);
    });

    this.path.post('user', async (req, _res) => {
      const user = req.body.user;
      return await this.userService.addUser(user);
    });

    this.path.post('authTrigger/user', async (req, _res) => {
      const data = req.body;
      return await this.userService.addUserFromTrigger(data);
    });
  }

  getPath() {
    return this.path;
  }
}
