import ReceiptListPage from 'components/ReceiptList';
import WrapAuthPage from 'helpers/AuthWrapper';

const Home = () => {
  return <ReceiptListPage />;
};

export default WrapAuthPage(ReceiptListPage);
