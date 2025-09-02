import {
  IAuthenticateGeneric,
  ICredentialTestRequest,
  ICredentialType,
  INodeProperties,
} from 'n8n-workflow';

export class listmonkApi implements ICredentialType {
  name = 'listmonkApi';
  displayName = 'Listmonk API';
  documentationUrl = 'https://listmonk.app/docs/api/';
  properties: INodeProperties[] = [
    {
      displayName: 'Base URL',
      name: 'baseUrl',
      type: 'string',
      default: '',
      placeholder: 'https://listmonk.example.com',
      required: true,
      description: 'Your Listmonk base URL (without trailing slash).',
    },
    {
      displayName: 'Username',
      name: 'username',
      type: 'string',
      default: '',
      required: true,
    },
    {
      displayName: 'Password',
      name: 'password',
      type: 'string',
      typeOptions: { password: true },
      default: '',
      required: true,
    },
  ];

  // Use HTTP Basic Auth for Listmonk admin API
  authenticate: IAuthenticateGeneric = {
    type: 'generic',
    properties: {
      auth: {
        username: '={{$credentials.username}}',
        password: '={{$credentials.password}}',
      },
    },
  };

  // Basic smoke test: fetch lists to validate credentials and base URL
  test: ICredentialTestRequest = {
    request: {
      // Listmonk admin API is served under /api
      url: '=/api/lists',
      baseURL: '={{$credentials.baseUrl}}',
      method: 'GET',
    },
  };
}

