import receiptApi from 'api/receipt';
import ReceiptDetail from 'components/ReceiptDetail';
import WrapAuthPage from 'helpers/AuthWrapper';
import { useRouter } from 'next/router';

const ReceiptDetailPage = () => {
  const router = useRouter();
  const { createReceipt } = receiptApi();

  const handleSaveClick = async (newReceiptInfo, removeImageIndexList) => {
    await createReceipt(newReceiptInfo);

    // alert OK 누르면 메인으로 이동
    if (alert('상품등록이 완료되었어요.')) {
    } else {
      router.replace('/');
    }
  };

  return <ReceiptDetail isEdit onSaveClick={handleSaveClick} />;
};

export default WrapAuthPage(ReceiptDetailPage);
