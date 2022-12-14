import React from 'react';

import { Text, Container } from '/src/components/atoms';
import { colors } from '/src/libs/theme';

import TemplatesList from '/src/containers/templates-list';

export default () => {
    return (
        <Container>
            <Text mb="8px" size={48} color={colors.blue} weight={700}>makeadoc</Text>
            <Text mb="32px" size={18} color={colors.text} weight={300}>
                Create any document you want using ejs templates.
            </Text>

            <TemplatesList />
        </Container>
    );
};
