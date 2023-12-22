import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { getGatewayMethodOptions, getNestJSLambdaRole, integrationOptions } from './helpers';
import { getNestJSLambda } from './lambdas';
import { getNestJSApiGateway } from './api-gateways';
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';

export class CdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const role = getNestJSLambdaRole(this);
    const nodeJsLambda = getNestJSLambda(this, role);
    const gateway = getNestJSApiGateway(this,nodeJsLambda);

    const gatewayMethodOptions = getGatewayMethodOptions(gateway);
    const proxyResource = gateway.root.addResource( '{proxy+}' );
    // proxyResource.addMethod( 'ANY' , new LambdaIntegration(nodeJsLambda));

    const proxyIntegration = new LambdaIntegration(nodeJsLambda, {
      proxy: true,
      ...integrationOptions,
    })

    proxyResource.addMethod('ANY', proxyIntegration, {
      ...gatewayMethodOptions,
    });
  }
}
