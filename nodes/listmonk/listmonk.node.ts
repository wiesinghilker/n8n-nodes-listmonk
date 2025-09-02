import { INodeType, INodeTypeDescription } from 'n8n-workflow';
import { N8NPropertiesBuilder, N8NPropertiesBuilderConfig } from '@devlikeapro/n8n-openapi-node';
import * as doc from './openapi.json';

const config: N8NPropertiesBuilderConfig = {};
const parser = new N8NPropertiesBuilder(doc as any, config);
const properties = parser.build();

export class listmonk implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Listmonk',
    name: 'listmonk',
    icon: 'file:logo.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: 'Interact with Listmonk API',
    defaults: {
      name: 'Listmonk',
    },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [
      {
        name: 'listmonkApi',
        required: true,
      },
    ],
    requestDefaults: {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      // Base URL from credentials, Listmonk admin API lives under /api
      baseURL: '={{$credentials.baseUrl}}/api',
    },
    properties: properties,
  };
}

