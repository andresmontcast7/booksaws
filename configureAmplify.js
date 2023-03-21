import Amplify from "aws-amplify";
import config from "./src/aws-exports"
Amplify.configure(config)
Amplify.configure({
    "aws_project_region": "us-east-1",
    "aws_appsync_graphqlEndpoint": "https://66gbh75majcplcb7jcip3gl6z4.appsync-api.us-east-1.amazonaws.com/graphql",
    "aws_appsync_region": "us-east-1",
    "aws_appsync_authenticationType": "API_KEY",
    "aws_appsync_apiKey": "da2-h3i4hgsemfd3nddqdbljdt3oqe",
    "aws_cognito_identity_pool_id": "us-east-1:c7e67da4-001d-4562-a8c2-210de69d13b4",
    "aws_cognito_region": "us-east-1",
    "aws_user_pools_id": "us-east-1_twKDkASV3",
    "aws_user_pools_web_client_id": "653a38225o489e0qpbghcg4hl1",
    "oauth": {},
    "aws_cognito_username_attributes": [],
    "aws_cognito_social_providers": [],
    "aws_cognito_signup_attributes": [
        "EMAIL"
    ],
    "aws_cognito_mfa_configuration": "OFF",
    "aws_cognito_mfa_types": [
        "SMS"
    ],
    "aws_cognito_password_protection_settings": {
        "passwordPolicyMinLength": 8,
        "passwordPolicyCharacters": []
    },
    "aws_cognito_verification_mechanisms": [
        "EMAIL"
    ]
  });