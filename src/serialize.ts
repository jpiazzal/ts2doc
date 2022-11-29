import ts from 'typescript';

import { VariableDeclaration } from './Declarations';

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
): VariableDeclaration[] {
    return variableStatement.declarationList.declarations.map((variableDeclaration) => {
        return serializeVariableDeclaration(variableDeclaration, checker);
    });
}
