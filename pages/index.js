import userApi from 'api/user';
import ReceiptListPage from 'components/ReceiptListPage';
import ReceiptListPreviewPage from 'components/ReceiptListPreviewPage';
import { useEffect, useState } from 'react';

const Home = () => {
  const [userInfo, setUserInfo] = useState({});
  const { getUserInfo } = userApi();

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUserInfo();
      setUserInfo(userData);
    };

    fetchUser();
  }, []);

  console.log(userInfo);

  if (!userInfo.logged) return <ReceiptListPreviewPage />;

  return <ReceiptListPage userInfo={userInfo} />;
};

export default Home;
