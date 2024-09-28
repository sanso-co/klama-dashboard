import styled from "@emotion/styled";

interface Props {
  children: React.ReactNode;
  justify?: "flex-start" | "center" | "flex-end" | "space-between" | "space-around" | "space-evenly";
  gap?: string;
}

export const Flex = ({ children, justify, gap }: Props) => {
  return (
    <Container justify={justify} gap={gap}>
      {children}
    </Container>
  );
};

interface StyleProps {
  justify?: "flex-start" | "center" | "flex-end" | "space-between" | "space-around" | "space-evenly";
  gap?: string;
}

const Container = styled.div<StyleProps>`
  display: flex;
  justify-content: ${({ justify }) => justify || "flex-start"};
  align-items: center;
  gap: ${({ gap }) => gap || "0"};
`;
