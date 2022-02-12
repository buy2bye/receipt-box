import Login from '/components/login/Login';
import styled from '@emotion/styled';

const Layout = ({ children }) => {
  return <Container>{children}</Container>;
};

export default Layout;

const Container = styled.div`
  width: 100vw;
  height: auto;
  min-height: 100vh;
`;
