import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import ReceiptDetail from 'components/ReceiptDetail'
import WrapAuthPage from 'helpers/AuthWrapper';


const ReceiptDetailPage = () => {
  const handleSaveClick = async (
    nickname,
    productName,
    productPlace,
    productPrice,
    productDate,
    usedDealAlert
  ) => {
    // await changeReceiptInfo(
  //     id,
  //     nickname,
  //     productName,
  //     productPlace,
  //     productPrice,
  //     productDate,
  //     usedDealAlert
  //   );
  }

  return (
    <ReceiptDetail
      isEdit
      onSaveClick={handleSaveClick}
    />
  )
}

export default WrapAuthPage(ReceiptDetailPage);
