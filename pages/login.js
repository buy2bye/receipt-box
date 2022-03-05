import FullScreenSpinner from 'components/common/FullScreenSpinner';
import Login from 'components/login/Login';
import WrapAuthPage from 'helpers/AuthWrapper';

const LoginPage = ({ ctx }) => {
  return <Login />;
};

export default WrapAuthPage(LoginPage, true);
