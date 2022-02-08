import Login from '/components/main/Login';
import { useState } from 'react';

const Layout = () => {
  const [isLogged, setIsLogged] = useState(false);

  if (!isLogged) return <Login />;

  return <div>layout</div>;
};

export default Layout;
