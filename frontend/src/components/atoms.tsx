import React from "react";
import styled, { css } from "styled-components";

import { PropsOf } from "/src/libs/utils";
import { colors } from "/src/libs/theme";

export type BaseProps = {
  p?: string;
  pt?: string;
  pl?: string;
  pr?: string;
  pb?: string;
  m?: string;
  mt?: string;
  mr?: string;
  mb?: string;
  ml?: string;
  w?: string;
  h?: string;
  mw?: string;
  mh?: string;
};

export const Base = styled.div<BaseProps>`
  padding: ${(props) => props.p};
  padding-top: ${(props) => props.pt};
  padding-right: ${(props) => props.pr};
  padding-left: ${(props) => props.pl};
  padding-bottom: ${(props) => props.pb};
  margin: ${(props) => props.m};
  margin-top: ${(props) => props.mt};
  margin-right: ${(props) => props.mr};
  margin-left: ${(props) => props.ml};
  margin-bottom: ${(props) => props.mb};
  width: ${(props) => props.w};
  height: ${(props) => props.h};
  max-width: ${(props) => props.mw};
  max-height: ${(props) => props.mh};
  box-sizing: border-box;
`;

export const Card = styled(Base)<{ color?: string }>`
  background: ${(props) => props.color || "#f5f5f5"};
  border-radius: 4px;
`;

export const Flex = styled(Base)<{
  dir?: "row" | "column";
  align?: "center" | "flex-start" | "flex-end";
  justify?: "center" | "flex-start" | "flex-end" | "space-around" | "space-between";
  wrap?: boolean;
  gap?: number;
}>`
  display: flex;
  flex-direction: ${(props) => props.dir || "row"};
  align-items: ${(props) => props.align || "center"};
  justify-content: ${(props) => props.justify || "center"};
  flex-wrap: ${(props) => (props.wrap ? "wrap" : "nowrap")};
  gap: ${(props) => props.gap || 0}px;
`;

export const Text = styled(Base)<{ size: number; weight: number; color: string }>`
  font-family: Nunito;
  font-size: ${(props) => props.size}px;
  font-weight: ${(props) => props.weight};
  color: ${(props) => props.color};
  line-height: 1.6;
  text-align: ${(props) => props.align};
`;

export const Image = styled.img<BaseProps>`
  padding: ${(props) => props.p};
  padding-top: ${(props) => props.pt};
  padding-right: ${(props) => props.pr};
  padding-left: ${(props) => props.pl};
  padding-bottom: ${(props) => props.pb};
  margin: ${(props) => props.m};
  margin-top: ${(props) => props.mt};
  margin-right: ${(props) => props.mr};
  margin-left: ${(props) => props.ml};
  margin-bottom: ${(props) => props.mb};
  width: ${(props) => props.w};
  height: ${(props) => props.h};
  max-width: ${(props) => props.mw};
  max-height: ${(props) => props.mh};

  object-fit: cover;
  box-sizing: border-box;
`;

export const Clickable = styled(Card)<{ color: string }>`
  background: ${(props) => props.color};
  cursor: pointer;
  user-select: none;
  display: inline-block;

  &:active {
    transform: translateY(1px);
  }
`;

export const Container = ({ children, ...props }: { children: any } & PropsOf<typeof Flex>) => {
  return (
    <Flex {...props}>
      <Base p="80px 20px" w="100%" mw="1200px">
        {children}
      </Base>
    </Flex>
  );
};

export const Disabled = styled(Base)<{ disabled: boolean }>`
  ${(props) =>
    props.disabled &&
    css`
      opacity: 0.5;
      pointer-events: none;
    `};
`;

export const Loader = (props) => (
  <Text size={18} weight={800} color="#333" {...props}>
    Loading...
  </Text>
);

const LoadingWrap = styled(Base)`
  position: relative;
`;

const LoaderWrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20;

  background: rgba(255, 255, 255, 0.5);
`;

export const Loading = ({ loading, children, ...props }) => {
  return (
    <LoadingWrap {...props}>
      {children}

      {loading && (
        <LoaderWrap>
          <Loader />
        </LoaderWrap>
      )}
    </LoadingWrap>
  );
};

export const Code = styled.pre`
  background: ${colors.blueLight};
  font-family: Monospace;
  font-size: 16px;
  padding: 12px 16px;
  font-weight: 400;
`;
