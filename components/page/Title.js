import styled from '@emotion/styled';

const Title = ({ align, children }) => {
  return <Container align={align}>{children}</Container>;
};

const Container = styled.h2`
  margin: 0;
  padding-bottom: 24px;
  width: 100%;
  text-align: left;
  font-size: 18px;
  font-weight: 400;
  color: black;
  text-align: ${(props) => props.align || 'left'};
`;

export default Title;
