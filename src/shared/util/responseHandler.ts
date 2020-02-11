import { APIGatewayProxyResult } from 'aws-lambda';

export function ok(obj: APIGatewayProxyResult): APIGatewayProxyResult {
  obj['headers'] = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Con;trol-Allow-Methods': 'OPTIONS,POST,GET,PUT',
  };
  return obj;
}

export function created(obj: any): APIGatewayProxyResult {
  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PUT',
    },
    body: JSON.stringify(obj),
  };
}
