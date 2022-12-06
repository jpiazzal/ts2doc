import { H3, Table, P, Code } from '@storybook/components';
import { Declaration, InterfaceDeclaration } from '@ts2doc/json';

// FIXME: Not the best way, but for now it's ok
import doc from '.cache/ts2doc/doc.json';

interface InterfaceDocProps {
    name: string;
    title?: string;
    description?: string;
}

export default function InterfaceDoc({ name, title = `${name} - Types properties`, description }: InterfaceDocProps) {
    const interfaceDoc: InterfaceDeclaration = doc.find((d: Declaration) => d.name === name);
    return (
        <>
            <H3 className="sbdocs sbdocs-h3">{title}</H3>
            <P className="sbdocs sbdocs-p" style={{ whiteSpace: 'pre-wrap' }}>
                {description || interfaceDoc?.description}
            </P>
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
                    {interfaceDoc?.props?.map((prop) => (
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
