import ReceiptListPage from 'components/ReceiptList';
import apiController from 'helpers/apiController';
import WrapAuthPage from 'helpers/AuthWrapper';

const Home = ({ userInfo }) => {
  return <ReceiptListPage userInfo={userInfo} />;
};

export default WrapAuthPage(Home);

Home.getInitialProps = async (ctx) => {
  const { data: userInfo } = await apiController({ ctx: ctx }).get(
    '/api/user/info'
  );

  return {
    userInfo,
  };
};
