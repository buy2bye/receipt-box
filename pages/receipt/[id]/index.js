import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import receiptApi from 'api/receipt';
import ReceiptDetail from 'components/ReceiptDetail';
import WrapAuthPage from 'helpers/AuthWrapper';

const ReceiptDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [receipt, setReceipt] = useState();
  const [isEdit, setEditMode] = useState(false);

  const { getReceiptDetail, changeReceiptInfo, changeReceiptImages } =
    receiptApi();

  const fetchReceipt = async () => {
    const { data } = await getReceiptDetail(id);
    setReceipt(data);
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
      newReceiptInfo.usedDealAlert
    );

    await changeReceiptImages(
      id,
      null,
      null,
      imageList,
      removeImageIndexList
    );
    alert('정보 수정이 완료되었습니다!');
    router.reload();
  };

  return (
    <ReceiptDetail
      receipt={receipt}
      isEdit={isEdit}
      onEditClick={handleEditClick}
      onSaveClick={handleSaveClick}
      onBackClick={handleBackClick}
    />
  );
};

export default WrapAuthPage(ReceiptDetailPage);
