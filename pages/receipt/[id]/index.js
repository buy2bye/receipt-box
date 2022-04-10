import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import receiptApi from 'api/receipt';
import ReceiptDetail from 'components/ReceiptDetail'
import WrapAuthPage from 'helpers/AuthWrapper';


const ReceiptDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [receipt, setReceipt] = useState()
  const [isEdit, setEditMode] = useState(false)

  const {
    getReceiptDetail,
    changeReceiptInfo
  } = receiptApi();

  const fetchReceipt = async () => {
    const { data } = await getReceiptDetail(id);
    setReceipt(data);
    setEditMode(false)
  };

  useEffect(() => {
    fetchReceipt();
  }, []);

  const handleEditClick = () => {
    setEditMode(true);
  }

  const handleBackClick = () => {
    if (isEdit) {
      setEditMode(false)
    } else {
      router.back();
    }
  }

  const handleSaveClick = async (
    nickname,
    productName,
    productPlace,
    productPrice,
    productDate,
    usedDealAlert
  ) => {
    await changeReceiptInfo(
      id,
      nickname,
      productName,
      productPlace,
      productPrice,
      productDate,
      usedDealAlert
    );
    fetchReceipt()
  }

  return (
    <ReceiptDetail
      receipt={receipt}
      isEdit={isEdit}
      onEditClick={handleEditClick}
      onSaveClick={handleSaveClick}
      onBackClick={handleBackClick}
    />
  )
}

export default WrapAuthPage(ReceiptDetailPage);
