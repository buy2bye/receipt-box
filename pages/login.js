import Login from 'components/login/Login';
import WrapAuthPage from 'helpers/AuthWrapper';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const LoginPage = ({ ctx }) => {
  const router = useRouter();

  useEffect(() => {
    router.query.bz_tracking_id &&
      localStorage.setItem('bz_tracking_id', router.query.bz_tracking_id);
  }, []);

  return <Login />;
};

export default WrapAuthPage(LoginPage, true);
