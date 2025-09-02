import { INodeType, INodeTypeDescription } from 'n8n-workflow';
import { N8NPropertiesBuilder, N8NPropertiesBuilderConfig } from '@devlikeapro/n8n-openapi-node';
import * as doc from './openapi.json';

const config: N8NPropertiesBuilderConfig = {};
const parser = new N8NPropertiesBuilder(doc as any, config);
const properties = parser.build();

export class sevdesk implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'SevDesk',
        name: 'sevdesk',
        icon: 'file:logo.svg',
        group: ['transform'],
        version: 1,
        subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
        description: 'Interact with SevDesk API',
        defaults: {
            name: 'SevDesk',
        },
        inputs: ['main'],
        outputs: ['main'],
        credentials: [
            {
                name: 'sevdeskApi',
                required: true,
            },
        ],
        requestDefaults: {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            baseURL: 'https://my.sevdesk.de/api/v1',
        },
        properties: properties,
    };
}

