import { H3, Table, P, Code } from '@storybook/components';
import { InterfaceDeclaration } from '@ts2doc/json';

interface InterfaceDocProps {
    doc: InterfaceDeclaration;
    title?: string;
    description?: string;
}

export default function InterfaceDoc({
    doc,
    title = `${doc.name} - Types properties`,
    description = doc?.description
}: InterfaceDocProps) {
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
            <Table className="sbdocs sbdocs-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Required</th>
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
                            <td>
                                {prop.description ? <P style={{ whiteSpace: 'pre-wrap' }}>{prop.description}</P> : null}
                                {prop.readOnly ? <Code>Read Only</Code> : null}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}
