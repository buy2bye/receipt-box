import Login from '/components/login/Login';
import useMe from 'hooks/useMe';

const Layout = ({ children }) => {
  const { data: isLogged } = useMe();

  if (!isLogged) return <Login />;

  return <div>{children}</div>;
};

export default Layout;
