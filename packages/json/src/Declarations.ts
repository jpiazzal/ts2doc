export interface Declaration {
    name: string;
    description?: string;
    kind: 'variable' | 'interface' | 'prop';
}

export interface ExportedDeclarations {
    [key: string]: Declaration;
}

export interface VariableDeclaration extends Declaration {
    value: string;
}

export interface Link {
    href: string;
    text: string;
}

export interface JsDocTags {
    type?: string;
    deprecated?: boolean;
    links?: Link[];
    default?: string;
}

export interface PropDeclaration extends Declaration, JsDocTags {
    type: string;
    required: boolean;
    readOnly: boolean;
}

export interface InterfaceDeclaration extends Declaration, JsDocTags {
    props: PropDeclaration[];
}
