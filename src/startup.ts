import 'reflect-metadata';
import { APIGatewayProxyHandler, APIGatewayProxyEvent } from 'aws-lambda';
import { Routes } from './routes';
import { handleError } from '@util/errorHandler';
import { Inversify } from '@root/inversify.config';
import { ok } from '@util/responseHandler';

export const enrtyPoint: APIGatewayProxyHandler = async (
  event: any,
  _context,
) => {
  const inversifyContainer = new Inversify();
  const productService = inversifyContainer.getProductService();
  const questionService = inversifyContainer.getQuestionService();
  const knowledgeAreaService = inversifyContainer.getKnowledgeAreaService();
  const evidenceService = inversifyContainer.getEvidenceService();
  const userService = inversifyContainer.getUserService();
  const organizationService = inversifyContainer.getOrganizationService();
  const logger = inversifyContainer.getLogger();
  const pathController = new Routes(
    knowledgeAreaService,
    productService,
    evidenceService,
    questionService,
    userService,
    organizationService,
  ).getPath();
  try {
    let eventPolifil: APIGatewayProxyEvent;
    if (event.requestPath) {
      const httpMethod = event.method;
      const pathParameters = event.path;
      const path = event.requestPath;
      eventPolifil = { ...event, path, pathParameters, httpMethod };
    } else {
      eventPolifil = event;
    }
    const result = await pathController.run(eventPolifil, _context);
    return result;
  } catch (err) {
    return handleError(err, logger);
  } finally {
    inversifyContainer.destroyContainer();
  }
};
