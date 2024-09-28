import React from "react";
import styled from "@emotion/styled";

interface TableData {
  [key: string]: string | number;
}

interface Props {
  keys: string[];
  data: TableData[];
}

export const Table = ({ keys, data }: Props) => {
  return (
    <Container>
      <Header>
        {keys.map((key) => (
          <Item key={key} col={Object.values(keys).length}>
            {key}
          </Item>
        ))}
      </Header>
      <div>
        {data?.map((item, index) => (
          <Row key={index}>
            {keys.map((key) => (
              <Item key={key} col={Object.values(keys).length}>
                {item[key]}
              </Item>
            ))}
          </Row>
        ))}
      </div>
    </Container>
  );
};

interface StyleProps {
  col?: number;
}

const Container = styled.div`
  width: 100%;
`;

const Header = styled.ul`
  width: 100%;
  display: flex;
  list-style: none;
  background-color: bisque;
`;

const Row = styled.ul`
  width: 100%;
  display: flex;
  list-style: none;
`;

const Item = styled.li<StyleProps>`
  width: ${(props) => 100 / props.col}%;
`;
