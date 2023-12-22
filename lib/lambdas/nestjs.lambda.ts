import { IRole } from "aws-cdk-lib/aws-iam";
import { Code, Function, Runtime } from "aws-cdk-lib/aws-lambda";
import { CdkStack } from "../cdk-stack";
import { join } from "path";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";

export const getNestJSLambda = (scope: CdkStack, role: IRole) => {
  return new NodejsFunction(scope, 'CDK-NodeJS-Lambda', {
    // runtime: Runtime.NODEJS_20_X,

    //! function
    // handler: 'main.handler',
    // code: Code.fromAsset(join(__dirname + '/../../dist/')),

    //! nodejsfunction
    handler: 'handler',
    entry: join(__dirname + "/../../src/main-lambda.ts"),

    role,
    // environment: {
    //   PASSWORD: process.env.jimmba as string,
    // },

    bundling: {
      externalModules: [
        '@nestjs/websockets/socket-module',
        '@nestjs/microservices/microservices-module',
        'class-validator',
        'class-transformer',
        '@nestjs/microservices',
      ]
    }
  });
}
