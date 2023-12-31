import { LambdaRestApi } from 'aws-cdk-lib/aws-apigateway';
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { CdkStack } from '../cdk-stack';

export const getNestJSApiGateway = (stack: CdkStack, lambda: NodejsFunction): LambdaRestApi => {
  return new LambdaRestApi(stack, "CDK-nest-js-app", {
    description: 'nestJS api gateway',
    handler: lambda,
    proxy: false,
  });
}
