import React from 'react';

import { colors } from '/src/libs/theme';
import { Loading, Text, Flex, Clickable } from '/src/components/atoms';
import { Table, Row, Item } from '/src/components/advanced';

const useQuery = (query, deps) => {
    const [value, setValue] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        setLoading(true);
        query().then(setValue).catch(setError).then(() => setLoading(false));
    }, deps);

    return [value, loading, error];
};

export default () => {
    const fileInputRef = React.useRef(null);

    const startUpload = React.useCallback(() => {
        fileInputRef.current?.click?.();
    }, []);

    const uploadFile = React.useCallback((e) => {
        const files = e.target.files;
        const formData = new FormData();

        formData.append('file', files[0]);
        
        fetch('http://localhost:3000/templates', { method: 'POST', body: formData, }).then(res => res.json()).then(console.log)
    }, []);

    const [templates, loading] = useQuery(() => {
        return fetch('http://localhost:3000/templates').then((res) => res.json());
    }, []);

    return (
        <>
            <Text mb="8px" size={24} color={colors.text} weight={700}>Your templates</Text>

            <Loading mb="24px" loading={loading}>
                {templates?.length === 0 ? (
                    <Text size={18} color={colors.text} weight={300}>You have no templates right now.</Text>
                ) : (
                    <Table>
                        {templates?.map((template) => (
                            <Row key={template._id}>
                                <Item w="100%">
                                    <Text w="100%" align="left" size={18} weight={800} color={colors.blue}>
                                        {template.meta?.name ? template.meta.name : `Template #${template._id.toString().slice(-4)}`}
                                    </Text>
                                </Item>

                                <Item w="100%">
                                    <Text w="100%" align="left" size={18} weight={300} color={colors.text}>{template.type}</Text>
                                </Item>

                                <Item w="100%">
                                    <Text w="100%" align="left" size={18} weight={300} color={colors.text}>{template.status}</Text>
                                </Item>
                            </Row>
                        ))}
                    </Table>
                )}
                
            </Loading>

            {/* hidden file input for download */}
            <input ref={fileInputRef} type="file" style={{ display: 'none' }} onChange={uploadFile} />

            <Flex gap={8} justify="flex-start">
                <Clickable color={colors.yellow} p="8px 16px" onClick={startUpload}>
                    <Text size={18} color={colors.white} weight={700}>Upload one</Text>
                </Clickable>

                <Text size={18} color={colors.text} weight={300}>or</Text>

                <Clickable color="none">
                    <Text size={18} color={colors.yellow} weight={700}>extend existing one</Text>
                </Clickable>
            </Flex>
{/*  */}
        </>
    );
};
