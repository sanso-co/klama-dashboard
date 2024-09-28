import styled from "@emotion/styled";

interface Props {
  children: React.ReactNode;
}

export const Div = ({ children }: Props) => {
  return <Container>{children}</Container>;
};

const Container = styled.div`
  width: 100%;
`;
