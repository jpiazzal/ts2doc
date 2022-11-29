import ts from 'typescript';

/**
 * Return true if node is exported (export or export default)
 */
export function isNodeExported(node: ts.Node): boolean {
    const combinedFlags = ts.getCombinedModifierFlags(node as ts.Declaration);
    return combinedFlags === ts.ModifierFlags.Export || combinedFlags === ts.ModifierFlags.ExportDefault;
}
