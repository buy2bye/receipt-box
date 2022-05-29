import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import receiptApi from 'api/receipt';
import ReceiptDetail from 'components/ReceiptDetail';
import WrapAuthPage from 'helpers/AuthWrapper';

const ReceiptDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [categories, setCategories] = useState([]);
  const [receipt, setReceipt] = useState();
  const [isEdit, setEditMode] = useState(false);

  const {
    getCategories,
    getReceiptDetail,
    changeReceiptInfo,
    changeReceiptImages
 } = receiptApi();

  const fetchReceipt = async () => {
    const { data: categorieData } = await getCategories();
    const { data: receipt } = await getReceiptDetail(id);
    setCategories(categorieData.categoryList)
    setReceipt(receipt);
    setEditMode(false);
  };

  useEffect(() => {
    fetchReceipt();
  }, []);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleBackClick = () => {
    if (isEdit) {
      setEditMode(false);
    } else {
      router.back();
    }
  };

  const handleSaveClick = async (
    newReceiptInfo,
    newProductImage,
    newBackgroundImage,
    imageList,
    removeImageIndexList
  ) => {
    await changeReceiptInfo(
      id,
      newReceiptInfo.nickname,
      newReceiptInfo.productName,
      newReceiptInfo.productPlace,
      newReceiptInfo.productPrice,
      newReceiptInfo.productDate,
      newReceiptInfo.usedDealAlert,
      newReceiptInfo.memo,
      newReceiptInfo.category.id
    );

    await changeReceiptImages(
      id,
      newProductImage,
      newBackgroundImage,
      imageList,
      removeImageIndexList
    );
    alert('정보 수정이 완료되었습니다!');
    router.reload();
  };

  return (
    <ReceiptDetail
      categories={categories}
      receipt={receipt}
      isEdit={isEdit}
      onEditClick={handleEditClick}
      onSaveClick={handleSaveClick}
      onBackClick={handleBackClick}
    />
  );
};

export default WrapAuthPage(ReceiptDetailPage);
