import { OpenAPIV3 } from 'openapi-types';
import path from 'path';
import yaml from 'yaml';

export function parseInput(input: string, inputContent: string) {
  const trimmed = inputContent.trim();
  let document: OpenAPIV3.Document;

  if (path.extname(input) === '.json') {
    document = JSON.parse(trimmed);
  } else if (path.extname(input) === '.yaml') {
    document = yaml.parse(trimmed);
  } else {
    throw new Error(
      'Invalid input supplied. Expected input to be JSON or YAML.'
    );
  }

  return document;
}
