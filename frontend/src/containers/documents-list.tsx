import React from 'react';
import YAML from 'yaml';

import { Code, Disabled, Base, Text, Flex, Clickable } from '/src/components/atoms';
import { OptionsInput, CodeInput } from '/src/components/inputs';
import { Table, Row, Item } from '/src/components/advanced';

import { colors } from '/src/libs/theme';
import { api } from '/src/libs/api';

import { useQuery, useTicker } from '/src/libs/hooks';

import { Download } from '@styled-icons/boxicons-regular/Download';
import { Delete } from '@styled-icons/fluentui-system-filled/Delete';

export default () => {
    const ticker = useTicker();

    const [value, setValue] = React.useState(null);
    const [data, setData] = React.useState('');
    const [templates, loading] = useQuery(() => api.templates.all(), []);

    const options = React.useMemo(() => {
        return (templates || []).map((template) => ({
            value: template._id,
            label: template.meta?.name ? template.meta.name : `Template #${template._id.slice(-4)}`
        }));
    }, [templates]);

    const [documents] = useQuery(() => api.documents.all(), [ticker]);

    const addDocument = () => {
        const meta = YAML.parse(data);
        const templateId = value;

        api.documents.create(templateId, meta).then(() => {
            ticker.update();
        });
    };

    const download = (id: string) => {
        api.documents.pdf(id);
    };

    const remove = (id: string) => {
        api.documents.remove(id).then(() => {
            ticker.update();
        });
    };

    const meta = React.useMemo(() => {
        const template = templates?.find((t) => t._id === value);
        return YAML.stringify(template?.meta || {});
    }, [templates, value]);

    return (
        <>
            <Text mb="8px" size={24} color={colors.text} weight={700}>Your documents</Text>

            <Base  mb="24px">
                {documents?.length === 0 ? (
                    <Text size={18} color={colors.text} weight={400}>You have no documents available</Text>
                ) : (
                    <Table>
                        {documents?.map((document) => (
                            <Row key={document._id}>
                                <Item w="100%">
                                    <Text w="100%" align="left" size={18} weight={800} color={colors.blue}>
                                        Document #{document._id.slice(-4)}
                                    </Text>
                                </Item>

                                <Item w="100%">
                                    <Text w="100%" align="left" size={18} weight={300} color={colors.text}>
                                        Template #{document.templateId?.slice(-4) || '____'}
                                    </Text>
                                </Item>

                                <Item w="100%">
                                    <Flex justify="flex-end" w="100%" gap={8}>
                                        <Clickable color="none" onClick={() => download(document._id)}>
                                            <Download color={colors.blue} width={28} />
                                        </Clickable>

                                        <Clickable color="none" onClick={() => remove(document._id)}>
                                            <Delete color={colors.blue} width={28} />
                                        </Clickable>
                                    </Flex>
                                </Item>
                            </Row>
                        ))}
                    </Table>
                )}                
            </Base>
            
            <Flex mb="12px" justify="flex-start" gap={8}>
                <Disabled disabled={value === null}>
                    <Clickable w="250px" color={colors.yellow} p="8px 16px" onClick={addDocument}>
                        <Text w="100%" align="center" size={18} weight={800} color={colors.white}>Add document</Text>
                    </Clickable>
                </Disabled>

                <OptionsInput placeholder="Template" w="100%" value={value} onChange={setValue} options={options} />
            </Flex>

            <CodeInput mb="8px" placeholder="YAML" w="100%" value={data} onChange={setData} />

            {meta && (
                <Code>
                    {meta}
                </Code>
            )}
        </>
    );
};
