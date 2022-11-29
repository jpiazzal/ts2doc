import ts from 'typescript';

import { Declaration } from './Declarations';
import { serializeVariableStatement } from './serialize';
import { isNodeExported } from './utils';

function visit(node: ts.Node, checker: ts.TypeChecker): Declaration[] {
    // Only consider exported nodes
    if (!isNodeExported(node)) {
        return [];
    }

    // Eg: export const foo = 1;
    if (ts.isVariableStatement(node)) {
        return serializeVariableStatement(node, checker);
    }
    return [];
}

export function getDocFromFiles(filesPath: string[], options?: ts.CompilerOptions): Declaration[] {
    // Don't need particular options
    options = options || {};

    const program: ts.Program = ts.createProgram(filesPath, options);
    const checker = program.getTypeChecker();
    let exportedDeclarations: Declaration[] = [];

    // Visit every sourceFile in the program
    for (const sourceFile of program.getSourceFiles()) {
        if (!sourceFile.isDeclarationFile) {
            ts.forEachChild(sourceFile, (node: ts.Node) => {
                const declaration = visit(node, checker);
                exportedDeclarations = [...exportedDeclarations, ...declaration];
            });
        }
    }

    return exportedDeclarations;
}
