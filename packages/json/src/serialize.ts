import ts from 'typescript';

import { ExportedDeclarations, VariableDeclaration, InterfaceDeclaration, PropDeclaration } from './Declarations';
import { getJsDocDescription } from './utils';

export function serializeVariableDeclaration(
    variableDeclaration: ts.VariableDeclaration,
    checker: ts.TypeChecker
): VariableDeclaration {
    const type = checker.getTypeAtLocation(variableDeclaration);
    const value = checker.typeToString(type);
    const name = variableDeclaration.name.getText();
    return { name, kind: 'variable', value };
}

export function serializeVariableStatement(
    variableStatement: ts.VariableStatement,
    checker: ts.TypeChecker
): ExportedDeclarations {
    const exportedDeclarations: ExportedDeclarations = {};
    for (const variableDeclaration of variableStatement.declarationList.declarations) {
        const variableSerialized = serializeVariableDeclaration(variableDeclaration, checker);
        exportedDeclarations[variableSerialized.name] = variableSerialized;
    }
    return exportedDeclarations;
}

export function serializeProp(prop: ts.PropertySignature, checker: ts.TypeChecker): PropDeclaration {
    return {
        name: prop.name.getText(),
        kind: 'prop',
        type: prop.type ? checker.typeToString(checker.getTypeFromTypeNode(prop.type)) : '',
        required: !prop.questionToken,
        readOnly: ts.getCombinedModifierFlags(prop) === ts.ModifierFlags.Readonly,
        description: getJsDocDescription(prop as any) || ''
    };
}

export function serializeInterface(node: ts.InterfaceDeclaration, checker: ts.TypeChecker): InterfaceDeclaration {
    return {
        name: node.name.getText(),
        kind: 'interface',
        description: getJsDocDescription(node as any) || '',
        props: node.members.map((prop) => serializeProp(prop as ts.PropertySignature, checker))
    };
}
