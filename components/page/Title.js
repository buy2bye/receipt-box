import styled from '@emotion/styled';

const Title = ({ children }) => {
  return <Container>{children}</Container>;
};

const Container = styled.h2`
  margin: 20px 0;
  text-align: left;
  font-size: 20px;
  font-weight: 400;
  color: black;
`;

export default Title;
