import { ManagedPolicy, Role, ServicePrincipal } from "aws-cdk-lib/aws-iam";
import { CdkStack } from "../cdk-stack";

export const getNestJSLambdaRole = (stack: CdkStack): Role => {
  const cloudWatchPolicy = ManagedPolicy.fromAwsManagedPolicyName('CloudWatchFullAccess');
  // const dynamoDBFullAccessPolicy = ManagedPolicy.fromAwsManagedPolicyName('AmazonDynamoDBFullAccess'); //! RDS policy
    return new Role(stack, 'dynamoDbLambdaFullAccessRole', {
      managedPolicies: [
        cloudWatchPolicy,
        // dynamoDBFullAccessPolicy
      ],
      assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
    })
}
