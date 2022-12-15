import React from 'react';
import { Text } from '/src/components/atoms';
import { colors } from '/src/libs/theme';

export default () => {
    return (
        <>
            <Text mb="8px" size={24} color={colors.text} weight={700}>Your documents</Text>
        </>
    )
};
