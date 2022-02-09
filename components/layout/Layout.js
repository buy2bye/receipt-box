import Login from '/components/login/Login';
import useMe from 'hooks/useMe';
import styled from '@emotion/styled';

const Layout = ({ children }) => {
  const { data: isLogged } = useMe();

  if (!isLogged)
    return (
      <Container>
        <Login />
      </Container>
    );

  return <Container>{children}</Container>;
};

export default Layout;

const Container = styled.div`
  width: 100vw;
  height: auto;
  min-height: 100vh;
`;
