import styled from '@emotion/styled';

const Title = ({ align, children }) => {
  return <Container align={align}>{children}</Container>;
};

const Container = styled.h2`
  margin: 24px 0;
  width: 100%;
  text-align: left;
  font-size: 20px;
  font-weight: 400;
  color: black;
  text-align: ${(props) => props.align || 'left'};
`;

export default Title;
