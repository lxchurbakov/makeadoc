import React from "react";

import { Base, Text, Container } from "/src/components/atoms";
import { colors } from "/src/libs/theme";

import TemplatesList from "/src/containers/templates-list";
import DocumentsList from "/src/containers/documents-list";

export default () => {
  return (
    <Container>
      <Text size={48} color={colors.blue} weight={800}>
        makeadoc
      </Text>
      <Text mb="32px" size={18} color={colors.text} weight={400}>
        Create any document you want using ejs templates.
      </Text>

      <Base mb="48px">
        <TemplatesList />
      </Base>

      <Base mb="48px">
        <DocumentsList />
      </Base>
    </Container>
  );
};
