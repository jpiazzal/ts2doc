import ts from 'typescript';

import { ExportedDeclarations } from './Declarations';
import { serializeVariableStatement, serializeInterface } from './serialize';
import { isNodeExported } from './utils';

export * from './Declarations';

function visit(node: ts.Node, checker: ts.TypeChecker): ExportedDeclarations {
    // Only consider exported nodes
    if (!isNodeExported(node)) {
        return {};
    }

    if (ts.isVariableStatement(node)) {
        // Eg: export const foo = 1;
        return serializeVariableStatement(node, checker);
    } else if (ts.isInterfaceDeclaration(node)) {
        // Eg: export interface Foo { bar: string }
        const interfaceSerialized = serializeInterface(node, checker);
        return {
            [interfaceSerialized.name]: interfaceSerialized
        };
    }
    return {};
}

export function ts2doc(filesPath: string[], options?: ts.CompilerOptions): ExportedDeclarations {
    // Don't need particular options
    options = options || {};

    const program: ts.Program = ts.createProgram(filesPath, options);
    const checker = program.getTypeChecker();
    let exportedDeclarations: ExportedDeclarations = {};

    // Visit every sourceFile in the program
    for (const sourceFile of program.getSourceFiles()) {
        if (!sourceFile.isDeclarationFile) {
            ts.forEachChild(sourceFile, (node: ts.Node) => {
                const declaration = visit(node, checker);
                exportedDeclarations = { ...exportedDeclarations, ...declaration };
            });
        }
    }

    return exportedDeclarations;
}
