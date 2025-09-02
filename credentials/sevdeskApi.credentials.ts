import {
  IAuthenticateGeneric,
  ICredentialTestRequest,
  ICredentialType,
  INodeProperties,
} from 'n8n-workflow';

export class sevdeskApi implements ICredentialType {
  name = 'sevdeskApi';
  displayName = 'SevDesk API';
  documentationUrl = 'https://api.sevdesk.de/';
  properties: INodeProperties[] = [
    {
      displayName: 'API Token',
      name: 'apiToken',
      type: 'string',
      default: '',
      required: true,
      typeOptions: { password: true },
    },
  ];

  authenticate: IAuthenticateGeneric = {
    type: 'generic',
    properties: {
      headers: {
        // SevDesk expects the raw token in Authorization header
        Authorization: '={{$credentials.apiToken}}',
      },
    },
  };

  test: ICredentialTestRequest = {
    request: {
      baseURL: 'https://my.sevdesk.de/api/v1',
      url: '/Contact',
      method: 'GET',
    },
  };
}

