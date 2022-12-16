import React from 'react';

import { colors } from '/src/libs/theme';
import { Loading, Text, Flex, Clickable } from '/src/components/atoms';
import { Table, Row, Item } from '/src/components/advanced';
import { api } from '/src/libs/api';

import { useTicker, useQuery } from '/src/libs/hooks';
import { Delete } from '@styled-icons/fluentui-system-filled/Delete';

export default () => {
    const fileInputRef = React.useRef(null);

    const startUpload = React.useCallback(() => {
        fileInputRef.current?.click?.();
    }, []);

    const templatesTicker = useTicker();

    const uploadFile = React.useCallback((e) => {
        api.templates.upload(e.target.files[0]).then(() => {
            // TODO notifications
            templatesTicker.update();
        }).catch(() => {
            // TODO notifications
        });
    }, []);

    const [templates, loading] = useQuery(() => api.templates.all(), [templatesTicker]);

    const deleteTemplate = (id: string) => {
        api.templates.remove(id).then(() => {
            // TODO notifications
            templatesTicker.update();
        }).catch(() => {
            // TODO notifications
        });
    };

    return (
        <>
            <Text mb="8px" size={24} color={colors.text} weight={800}>Your templates</Text>

            <Loading mb="24px" loading={loading}>
                {templates?.length === 0 ? (
                    <Text size={18} color={colors.text} weight={400}>You have no templates right now.</Text>
                ) : (
                    <Table>
                        {templates?.map((template) => (
                            <Row key={template._id}>
                                <Item w="100%">
                                    <Text w="100%" align="left" size={18} weight={800} color={colors.blue}>
                                        {template.meta?.name ? template.meta.name : `Template #${template._id.slice(-4)}`}
                                    </Text>
                                </Item>

                                <Item w="100%">
                                    <Text w="100%" align="left" size={18} weight={400} color={colors.text}>{template.type}</Text>
                                </Item>

                                <Item w="100%">
                                    <Text w="100%" align="left" size={18} weight={400} color={colors.text}>{template.status}</Text>
                                </Item>

                                <Item w="50%">
                                    <Flex w="100%" justify="flex-end">
                                        <Clickable color="none" onClick={() => deleteTemplate(template._id)}>
                                            <Delete color={colors.blue} width={28} />
                                        </Clickable>
                                    </Flex>
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
                    <Text size={18} color={colors.white} weight={800}>Upload one</Text>
                </Clickable>

                <Text size={18} color={colors.text} weight={400}>or</Text>

                <Clickable color="none">
                    <Text size={18} color={colors.yellow} weight={800}>extend existing one</Text>
                </Clickable>

                <Text size={18} color={colors.text} weight={400}>(not implemented)</Text>
            </Flex>
        </>
    );
};
