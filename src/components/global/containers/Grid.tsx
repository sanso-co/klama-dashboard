import styled from "@emotion/styled";
import { breakpoint } from "../token";

interface Props {
  children: React.ReactNode;
  col?: number;
}

export const Grid = ({ children, col }: Props) => {
  return <Container col={col}>{children}</Container>;
};

interface StyleProps {
  col?: number;
}

const Container = styled.ul<StyleProps>`
  display: grid;
  grid-template-columns: ${({ col }) => (col ? `repeat(${col}, 1fr)` : "repeat(2, 1fr)")};
  grid-gap: 1.5rem;
  width: 100%;
  padding: 0 1rem;

  @media ${breakpoint.lg} {
    grid-template-columns: ${({ col }) => (col ? `repeat(${col}, 1fr)` : "repeat(2, 1fr)")};
    grid-gap: 2rem;
  }
`;
