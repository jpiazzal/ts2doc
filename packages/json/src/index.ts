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
    const filesParsed: string[] = [];

    // Visit every sourceFile in the program
    for (const sourceFile of program.getSourceFiles()) {
        if (!sourceFile.isDeclarationFile) {
            filesParsed.push(sourceFile.fileName);
            // eslint-disable-next-line no-loop-func
            ts.forEachChild(sourceFile, (node: ts.Node) => {
                const declaration = visit(node, checker);
                exportedDeclarations = { ...exportedDeclarations, ...declaration };
            });
        }
    }

    if (filesParsed.length !== filesPath.length) {
        const filesNotParsed = filesPath.filter((file) => !filesParsed.includes(file));
        throw new Error(`Unable to find following files: ${filesNotParsed.join(', ')}`);
    }

    return exportedDeclarations;
}
