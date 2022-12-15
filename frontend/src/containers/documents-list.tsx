import React from 'react';
import YAML from 'yaml';

import { Text, Flex, Clickable } from '/src/components/atoms';
import { OptionsInput, CodeInput } from '/src/components/inputs';
import { Table, Row, Item } from '/src/components/advanced';

import { colors } from '/src/libs/theme';
import { api } from '/src/libs/api';

import { useQuery } from '/src/libs/hooks';

export default () => {
    const [value, setValue] = React.useState(null);
    const [data, setData] = React.useState('');
    const [templates, loading] = useQuery(() => api.templates.all(), []);

    const options = React.useMemo(() => {
        return (templates || []).map((template) => ({
            value: template._id,
            label: template.meta?.name ? template.meta.name : `Template #${template._id.slice(-4)}`
        }));
    }, [templates]);

    const [documents] = useQuery(() => api.documents.all(), []);

    const addDocument = () => {
        const meta = YAML.parse(data);
        const templateId = value;

        // console.log('add document', value, data);
        api.documents.create(templateId, meta).then(console.log)
    };

    const download = (id: string) => {
        api.documents.pdf(id)
    };

    // const generate = () => {
    //     

    //     api.templates.pdf(value, body).then(console.log)
    // };

    return (
        <>
            <Text mb="8px" size={24} color={colors.text} weight={700}>Your documents</Text>
            <Text mb="24px" size={18} color={colors.text} weight={300}>You have no documents available</Text>

            <Table>
                {documents?.map((document) => (
                    <Row key={document._id}>
                        <Item w="100%">
                            <Text w="100%" align="left" size={18} weight={800} color={colors.blue}>
                                Document #{document._id.slice(-4)}
                            </Text>
                        </Item>

                        <Item w="100%">
                            <Clickable w="250px" color={colors.yellow} p="8px 16px" onClick={() => download(document._id)}>
                                <Text w="100%" align="center" size={18} weight={700} color={colors.white}>Download</Text>
                            </Clickable>
                        </Item>
                    </Row>
                ))}
            </Table>
            
            <Flex mb="12px" justify="flex-start" gap={8}>
                <Clickable w="250px" color={colors.yellow} p="8px 16px" onClick={addDocument}>
                    <Text w="100%" align="center" size={18} weight={700} color={colors.white}>Add document</Text>
                </Clickable>

                <OptionsInput w="100%" value={value} onChange={setValue} options={options} />
            </Flex>

            <CodeInput w="100%" value={data} onChange={setData} />
        </>
    );
};
