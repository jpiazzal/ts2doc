import fs from 'node:fs';
import path from 'node:path';

import ts2doc from '../src';

describe('Get doc from files', () => {
    let resourcesBasePath: string;

    beforeAll(() => {
        resourcesBasePath = path.join(__dirname, '..', 'examples');
    });

    test('Variables', () => {
        // Get expected result from json file
        const variablesJsonDoc = fs.readFileSync(path.join(resourcesBasePath, 'variables.json'), 'utf8');
        const expectedVariablesDoc = JSON.parse(variablesJsonDoc);

        // Get doc from ts file
        const variablesDoc = ts2doc([path.join(resourcesBasePath, 'variables.ts')]);

        expect(variablesDoc).toEqual(expectedVariablesDoc);
    });
});
