import React from 'react';
// import styled from 'styled-components';

import { colors } from '/src/libs/theme';
import { Base, Text, Flex, Clickable } from '/src/components/atoms';


export default () => {
    const fileInputRef = React.useRef(null);
    // const [modalVisible, setModalVisible] = React.useState(false);

    const startUpload = React.useCallback(() => {
        // setModalVisible(true);
        fileInputRef.current?.click?.();
    }, []);

    const uploadFile = React.useCallback((e) => {
        const files = e.target.files;
        const formData = new FormData();

        formData.append('file', files[0]);
        
        fetch('http://localhost:3000/templates', { method: 'POST', body: formData, }).then(res => res.json()).then(console.log)
        // console.log(files)
    }, []);

    return (
        <>
            <Text mb="8px" size={24} color={colors.text} weight={700}>Your templates</Text>
            <Text mb="24px" size={18} color={colors.text} weight={300}>You have no templates right now.</Text>

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
