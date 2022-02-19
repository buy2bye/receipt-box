import styled from '@emotion/styled';

const Title = ({ align, children }) => {
  return <Container align={align}>{children}</Container>;
};

const Container = styled.h2`
<<<<<<< HEAD
  margin: 24px 0;
  width: 100%;
=======
  margin: 20px 0;
>>>>>>> 37e184c460d51467e43b50933ba866fcfbad3b30
  text-align: left;
  font-size: 20px;
  font-weight: 400;
  color: black;
  text-align: ${(props) => props.align || 'left'};
`;

export default Title;
