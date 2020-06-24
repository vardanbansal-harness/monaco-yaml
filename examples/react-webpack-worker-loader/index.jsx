import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import MonacoEditor from 'react-monaco-editor';
// THIS WORKS
import 'monaco-yaml/esm/monaco.contribution';

import { languages } from 'monaco-editor/esm/vs/editor/editor.api';

// NOTE: This will give you all editor featues. If you would prefer to limit to only the editor
// features you want to use, import them each individually. See this example: (https://github.com/microsoft/monaco-editor-samples/blob/master/browser-esm-webpack-small/index.js#L1-L91)
import 'monaco-editor';

// NOTE: using loader syntax becuase Yaml worker imports editor.worker directly and that
// import shouldn't go through loader syntax.
import EditorWorker from 'worker-loader!monaco-editor/esm/vs/editor/editor.worker';
import YamlWorker from 'worker-loader!monaco-yaml/esm/yaml.worker';

window.MonacoEnvironment = {
  getWorker(workerId, label) {
    if (label === 'yaml') {
      return new YamlWorker();
    }
    return new EditorWorker();
  },
};

const { yaml } = languages || {};

const Editor = () => {
  const [value, setValue] = useState('p1: ');
  useEffect(() => {
    yaml &&
      yaml.yamlDefaults.setDiagnosticsOptions({
        validate: true,
        enableSchemaRequest: true,
        hover: true,
        completion: true,
        schemas: [
          {
            uri: 'http://myserver/foo-schema.json', // id of the first schema
            fileMatch: ['*'], // associate with our model
            schema: {
              $schema: 'http://json-schema.org/draft-07/schema',
              $id: 'http://example.com/example.json',
              type: 'object',
              title: 'The root schema',
              description:
                'The root schema comprises the entire JSON document.',
              default: {},
              examples: [
                {
                  connector: {
                    identifier: 'awsQA',
                    name: 'AWS QA account',
                    description: null,
                    tags: [
                      {
                        businessUnit: 'ecommerce',
                        aprroved: null,
                      },
                    ],
                    scope: 'project',
                    project: 'commerce-app',
                    organization: 'commerce',
                    type: 'gcp',
                    spec:
                      'service-account-key-file:"secretRefFile:gcp_service_account_file"',
                  },
                },
              ],
              required: ['connector'],
              additionalProperties: true,
              properties: {
                connector: {
                  $id: '#/properties/connector',
                  type: 'object',
                  title: 'The connector schema',
                  description:
                    'An explanation about the purpose of this instance.',
                  default: {},
                  examples: [
                    {
                      identifier: 'awsQA',
                      name: 'AWS QA account',
                      description: null,
                      tags: [
                        {
                          businessUnit: 'ecommerce',
                          aprroved: null,
                        },
                      ],
                      scope: 'project',
                      project: 'commerce-app',
                      organization: 'commerce',
                      type: 'gcp',
                      spec:
                        'service-account-key-file:"secretRefFile:gcp_service_account_file"',
                    },
                  ],
                  required: [
                    'identifier',
                    'name',
                    'description',
                    'tags',
                    'scope',
                    'project',
                    'organization',
                    'type',
                    'spec',
                  ],
                  additionalProperties: true,
                  properties: {
                    identifier: {
                      $id: '#/properties/connector/properties/identifier',
                      type: 'string',
                      title: 'The identifier schema',
                      description:
                        'An explanation about the purpose of this instance.',
                      default: '',
                      examples: ['awsQA'],
                    },
                    name: {
                      $id: '#/properties/connector/properties/name',
                      type: 'string',
                      title: 'The name schema',
                      description:
                        'An explanation about the purpose of this instance.',
                      default: '',
                      examples: ['AWS QA account'],
                    },
                    description: {
                      $id: '#/properties/connector/properties/description',
                      type: 'null',
                      title: 'The description schema',
                      description:
                        'An explanation about the purpose of this instance.',
                      default: null,
                      examples: [null],
                    },
                    tags: {
                      $id: '#/properties/connector/properties/tags',
                      type: 'array',
                      title: 'The tags schema',
                      description:
                        'An explanation about the purpose of this instance.',
                      default: [],
                      examples: [
                        [
                          {
                            businessUnit: 'ecommerce',
                            aprroved: null,
                          },
                        ],
                      ],
                      additionalItems: true,
                      items: {
                        anyOf: [
                          {
                            $id:
                              '#/properties/connector/properties/tags/items/anyOf/0',
                            type: 'object',
                            title: 'The first anyOf schema',
                            description:
                              'An explanation about the purpose of this instance.',
                            default: {},
                            examples: [
                              {
                                businessUnit: 'ecommerce',
                                aprroved: null,
                              },
                            ],
                            required: ['businessUnit', 'aprroved'],
                            additionalProperties: true,
                            properties: {
                              businessUnit: {
                                $id:
                                  '#/properties/connector/properties/tags/items/anyOf/0/properties/businessUnit',
                                type: 'string',
                                title: 'The businessUnit schema',
                                description:
                                  'An explanation about the purpose of this instance.',
                                default: '',
                                examples: ['ecommerce'],
                              },
                              aprroved: {
                                $id:
                                  '#/properties/connector/properties/tags/items/anyOf/0/properties/aprroved',
                                type: 'null',
                                title: 'The aprroved schema',
                                description:
                                  'An explanation about the purpose of this instance.',
                                default: null,
                                examples: [null],
                              },
                            },
                          },
                        ],
                        $id: '#/properties/connector/properties/tags/items',
                      },
                    },
                    scope: {
                      $id: '#/properties/connector/properties/scope',
                      type: 'string',
                      title: 'The scope schema',
                      description:
                        'An explanation about the purpose of this instance.',
                      default: '',
                      examples: ['project'],
                    },
                    project: {
                      $id: '#/properties/connector/properties/project',
                      type: 'string',
                      title: 'The project schema',
                      description:
                        'An explanation about the purpose of this instance.',
                      default: '',
                      examples: ['commerce-app'],
                    },
                    organization: {
                      $id: '#/properties/connector/properties/organization',
                      type: 'string',
                      title: 'The organization schema',
                      description:
                        'An explanation about the purpose of this instance.',
                      default: '',
                      examples: ['commerce'],
                    },
                    type: {
                      $id: '#/properties/connector/properties/type',
                      type: 'string',
                      title: 'The type schema',
                      description:
                        'An explanation about the purpose of this instance.',
                      default: '',
                      examples: ['gcp'],
                    },
                    spec: {
                      $id: '#/properties/connector/properties/spec',
                      type: 'string',
                      title: 'The spec schema',
                      description:
                        'An explanation about the purpose of this instance.',
                      default: '',
                      examples: [
                        'service-account-key-file:"secretRefFile:gcp_service_account_file"',
                      ],
                    },
                  },
                },
              },
            },
          },
        ],
      });
  }, []);

  return (
    <MonacoEditor
      width="800"
      height="600"
      language="yaml"
      value={value}
      onChange={setValue}
    />
  );
};

ReactDOM.render(<Editor />, document.getElementById('react'));
