import ts from 'typescript';

/**
 * Return true if node is exported (export or export default)
 */
export function isNodeExported(node: ts.Node): boolean {
    const combinedFlags = ts.getCombinedModifierFlags(node as ts.Declaration);
    return combinedFlags === ts.ModifierFlags.Export || combinedFlags === ts.ModifierFlags.ExportDefault;
}

/**
 * Return the description of a node if it has a JSDoc comment
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getJsDocDescription(node: any): string | undefined {
    return node?.jsDoc?.[0]?.comment;
}
