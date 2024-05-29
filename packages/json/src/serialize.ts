import ts from 'typescript';

import {
    ExportedDeclarations,
    VariableDeclaration,
    InterfaceDeclaration,
    PropDeclaration,
    JsDocTags
} from './Declarations';
import { getJsDocDescription } from './utils';

/**
 * VARIABLES
 */

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

/**
 * INTERFACES
 */

function serializeJsDoc(symbol: ts.Symbol): JsDocTags {
    const jsDocTagsSerialized: JsDocTags = {};
    if (symbol == null) {
        return jsDocTagsSerialized;
    }
    const jsDocTags = symbol.getJsDocTags();

    for (const tag of jsDocTags) {
        const tagValue: string = tag.text?.map((text) => text.text).join(' ') || '';
        const tagName: string = tag.name;

        switch (tagName) {
            case 'link': {
                if (jsDocTagsSerialized.links == null) {
                    jsDocTagsSerialized.links = [];
                }
                const [href, ...text] = tagValue.split(/ |\|/);
                jsDocTagsSerialized.links.push({
                    href,
                    text: text.join(' ').trim()
                });
                break;
            }
            case 'type': {
                jsDocTagsSerialized[tagName] = tagValue.replace(/{|}/g, '');
                break;
            }
            case 'deprecated': {
                jsDocTagsSerialized[tagName] = true;
                break;
            }
            case 'default': {
                jsDocTagsSerialized[tagName] = tagValue;
                break;
            }
            default: {
                break;
            }
        }
    }
    return jsDocTagsSerialized;
}

export function serializeProp(prop: ts.PropertySignature, checker: ts.TypeChecker): PropDeclaration {
    // typescript types are not correct, symbol is present on PropertySignature
    const jsDocTags: JsDocTags = serializeJsDoc((prop as any).symbol);
    const type = prop.type ? checker.typeToString(checker.getTypeFromTypeNode(prop.type)) : '';

    return {
        name: prop.name ? prop.name.getText() : '*',
        kind: 'prop',
        // JSDoc @type will override the true type
        type: jsDocTags.type || type,
        required: prop.name ? !prop.questionToken : false,
        readOnly: ts.getCombinedModifierFlags(prop) === ts.ModifierFlags.Readonly,
        description: getJsDocDescription(prop as any) || '',
        ...jsDocTags
    };
}

export function serializeInterface(node: ts.InterfaceDeclaration, checker: ts.TypeChecker): InterfaceDeclaration {
    const jsDocTags: JsDocTags = serializeJsDoc((node as any).symbol);

    return {
        name: node.name.getText(),
        extends: node.heritageClauses?.[0]?.types.map((type) => type.expression.getText()) || null,
        kind: 'interface',
        description: getJsDocDescription(node as any) || '',
        props: node.members.map((prop) => serializeProp(prop as ts.PropertySignature, checker)),
        ...jsDocTags
    };
}
