const { default: styled } = require('@emotion/styled');

const Subtitle = ({ children }) => {
  return <Container>{children}</Container>;
};

const Container = styled.h3`
  margin: -8px 0 20px 0;
  width: 100%;
  text-align: left;
  font-size: 16px;
  color: var(--grey700);
  font-weight: 300;
`;

export default Subtitle;
