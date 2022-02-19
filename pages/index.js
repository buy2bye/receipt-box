import ReceiptListView from 'components/ReceiptList';
import WrapAuthPage from 'helpers/AuthWrapper';

const ReceiptListPage = () => {
  return <ReceiptListView />;
};

export default WrapAuthPage(ReceiptListPage);
