import { IRole } from "aws-cdk-lib/aws-iam";
import { Code, Function, Runtime } from "aws-cdk-lib/aws-lambda";
import { CdkStack } from "../cdk-stack";
import { join } from "path";

export const getNestJSLambda = (scope: CdkStack, role: IRole) => {
  return new Function(scope, 'CDK-NodeJS-Lambda', {
    runtime: Runtime.NODEJS_20_X,
    role,
    handler: 'src/main-lambda.handler',
    code: Code.fromAsset(join(__dirname + '/../handlers/app.zip')),
    environment: {
      HOST: process.env.HOST as string,
      PORT: process.env.PORT as string,
      USER_NAME: process.env.USER_NAME as string,
      PASSWORD: process.env.PASSWORD as string,
      DATABASE_NAME: process.env.DATABASE_NAME as string,
    },
  });
}


