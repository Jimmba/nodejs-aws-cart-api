import { Cors, IntegrationOptions, LambdaRestApi, MethodOptions } from 'aws-cdk-lib/aws-apigateway';

export const getGatewayMethodOptions = (gateway: LambdaRestApi): MethodOptions => {
  const gatewayResponseBodyModel = gateway.addModel('model', {
    contentType: 'application/json',
    schema: {},
  });

  return {
    methodResponses: [
      {
        statusCode: '200',
        responseModels: {
          'application/json': gatewayResponseBodyModel,
        },
        responseParameters: {
          'method.response.header.Access-Control-Allow-Origin': true,
        }
      },
    ]
  }
}

export const CORS_PREFLIGHT_OPTIONS = {
  allowOrigins: Cors.ALL_ORIGINS,
  allowMethods: Cors.ALL_METHODS,
  allowHeaders: Cors.DEFAULT_HEADERS,
}

export const integrationOptions: IntegrationOptions = {
  integrationResponses: [
    {
      statusCode: '200',
      responseParameters: {
        'method.response.header.Access-Control-Allow-Origin': "'*'",
      }
    },
  ],
}
