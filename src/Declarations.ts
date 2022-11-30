export interface Declaration {
    name: string;
    description?: string;
    kind: 'variable' | 'interface' | 'prop';
}

export interface VariableDeclaration extends Declaration {
    value: string;
}

export interface PropDeclaration extends Declaration {
    type: string;
    required: boolean;
    readOnly: boolean;
}

export interface InterfaceDeclaration extends Declaration {
    props: PropDeclaration[];
}
