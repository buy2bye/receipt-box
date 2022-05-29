import { useEffect, useState } from 'react'
import receiptApi from 'api/receipt';
import ReceiptDetail from 'components/ReceiptDetail';
import ReceiptDetailPreview from 'components/ReceiptDetailPreview';
import WrapAuthPage from 'helpers/AuthWrapper';
import { useRouter } from 'next/router';

const ReceiptDetailPage = ({ query }) => {
  const router = useRouter();

  const [categories, setCategories] = useState([]);

  const { getCategories, createReceipt } = receiptApi();

  const fetchReceipt = async () => {
    const { data: categorieData } = await getCategories();
    setCategories(categorieData.categoryList)
  };

  useEffect(() => {
    fetchReceipt();
  }, []);

  const handleSaveClick = async (
    newReceiptInfo,
    newProductImage,
    newBackgroundImage,
    imageList,
    removeImageIndexList
  ) => {
    newReceiptInfo.productImage = newProductImage;
    newReceiptInfo.backgroundImage = newBackgroundImage;
    newReceiptInfo.imageList = imageList;

    await createReceipt(newReceiptInfo);

    // alert OK 누르면 메인으로 이동
    if (alert('애장품등록이 완료되었어요.')) {
    } else {
      router.replace('/');
    }
  };

  if (query.preview === 'yes')
    return <ReceiptDetailPreview isEdit onSaveClick={handleSaveClick} />;

  return <ReceiptDetail
    categories={categories}
    isEdit
    onSaveClick={handleSaveClick}
    onBackClick={() => router.replace('/')}
  />;
};

export default ReceiptDetailPage;

ReceiptDetailPage.getInitialProps = (ctx) => {
  const { query } = ctx;

  return { query };
};
