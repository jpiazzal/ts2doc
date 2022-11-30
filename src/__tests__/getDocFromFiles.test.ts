import fs from 'node:fs';
import path from 'node:path';

import { getDocFromFiles } from '../';

describe('Get doc from files', () => {
    let resourcesBasePath: string;

    beforeAll(() => {
        resourcesBasePath = path.join(__dirname, 'resources');
    });

    test('Variables', () => {
        // Get expected result from json file
        const variablesJsonDoc = fs.readFileSync(path.join(resourcesBasePath, 'variables.expected.json'), 'utf8');
        const expectedVariablesDoc = JSON.parse(variablesJsonDoc);

        // Get doc from ts file
        const variablesDoc = getDocFromFiles([path.join(resourcesBasePath, 'variables.ts')]);

        expect(variablesDoc).toEqual(expectedVariablesDoc);
    });
});
