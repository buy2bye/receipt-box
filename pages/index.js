import userApi from 'api/user';
import ReceiptListPage from 'components/ReceiptListPage';
import ReceiptListPreviewPage from 'components/ReceiptListPreviewPage';

const Home = ({ userInfo }) => {
  if (!userInfo.logged) return <ReceiptListPreviewPage />;

  return <ReceiptListPage userInfo={userInfo} />;
};

Home.getInitialProps = async (ctx) => {
  const { getUserInfo } = userApi();
  const userInfo = await getUserInfo(ctx);
  return {
    userInfo
  }
}

export default Home;
