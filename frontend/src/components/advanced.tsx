import styled from "styled-components";
import { Base, Flex } from "./atoms";

export const Table = styled(Base)`
  border-radius: 8px;
  overflow: hidden;
`;

export const Row = styled(Flex).attrs({
  align: "center",
  justify: "flex-start",
  w: "100%",
})`
  &:nth-child(2n + 1) {
    background: #e4eaf5;
  }
`;

export const Item = styled(Flex)`
  padding: 8px 16px;
`;
