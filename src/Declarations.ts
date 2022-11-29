export interface Declaration {
    name: string;
    kind: 'variable';
}

export interface VariableDeclaration extends Declaration {
    value: string;
}
