import { H3, H4, Table, P, Code } from '@storybook/components';
import { InterfaceDeclaration } from '@ts2doc/json';

import { Badge } from './Badge';
import { Links } from './JsDoc';
interface InterfaceDocProps {
    doc: InterfaceDeclaration;
    title?: string;
    description?: string;
}

export default function InterfaceDoc({ doc, title = doc.name, description = doc?.description }: InterfaceDocProps) {
    if (doc.kind !== 'interface') {
        throw new Error('InterfaceDoc can only be used with interface, be sure to send the right kind.');
    }
    return (
        <>
            <H3 className="sbdocs sbdocs-h3">{title}</H3>
            {description && (
                <P className="sbdocs sbdocs-p" style={{ whiteSpace: 'pre-wrap' }}>
                    {description}
                </P>
            )}
            {doc.links && <Links links={doc.links} />}
            <H4 className="sbdocs sbdocs-h4">Properties</H4>
            {doc.extends && (
                <P className="sbdocs sbdocs-p">
                    <Code>{doc.name}</Code> extends <Code>{doc.extends.join('')}</Code>
                </P>
            )}
            <Table className="sbdocs sbdocs-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Required</th>
                        <th>Default</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {doc?.props?.map((prop) => (
                        <tr key={prop.name}>
                            <td>{prop.name}</td>
                            <td>
                                <Code>{prop.type}</Code>
                            </td>
                            <td style={{ textAlign: 'center' }}>{prop.required ? '✅' : ''}</td>
                            <td style={{ textAlign: 'center' }}>{prop.default ? <Code>{prop.default}</Code> : '-'}</td>
                            <td>
                                {prop.deprecated && <Badge status="danger">Deprecated</Badge>}
                                {prop.description ? (
                                    <P className="sbdocs sbdocs-p" style={{ whiteSpace: 'pre-wrap' }}>
                                        {prop.description}
                                    </P>
                                ) : null}
                                {prop.links && <Links links={prop.links} />}
                                {prop.readOnly ? <Code>Read Only</Code> : null}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}
