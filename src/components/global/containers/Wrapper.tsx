import React from "react";
import styled from "@emotion/styled";

interface Props {
  className?: string;
  padding?: string;
  children: React.ReactNode;
}

export const Wrapper = ({ className, padding, children }: Props) => {
  return (
    <Container className={className} padding={padding}>
      {children}
    </Container>
  );
};

interface StyleProps {
  padding?: string;
}

const Container = styled.div<StyleProps>`
  padding: ${(props) => (props.padding ? props.padding : "0 1rem")};
`;
