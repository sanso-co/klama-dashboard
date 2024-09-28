import styled from "@emotion/styled";

interface Props {
  src: string;
  ratio?: string;
  rounded?: string;
  width?: string;
}

export const ImageContainer = ({ src, ratio, rounded, width }: Props) => {
  return (
    <Container ratio={ratio} rounded={rounded} width={width}>
      <img src={src} alt="" />
    </Container>
  );
};

interface ImageProps {
  ratio?: string;
  rounded?: string;
  width?: string;
}

const Container = styled.div<ImageProps>`
  position: relative;
  flex: 1;
  width: ${({ width }) => width || "100%"};
  border-radius: ${({ rounded }) => rounded || "0"};
  overflow: hidden;

  &:before {
    content: "";
    display: block;
    width: ${({ width }) => width || "100%"};
    padding-bottom: ${({ ratio }) => ratio || "100%"};
  }

  img {
    position: absolute;
    top: 0;
    bottom: 0;
    width: ${({ width }) => width || "100%"};
    max-height: 100%;
    object-fit: cover;
  }
`;
