import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import ReceiptDetail from 'components/ReceiptDetail';
import WrapAuthPage from 'helpers/AuthWrapper';

const ReceiptDetailPage = () => {
  const handleSaveClick = async (newReceiptInfo, images) => {
    await changeReceiptInfo(newReceiptInfo);
  };

  return <ReceiptDetail isEdit onSaveClick={handleSaveClick} />;
};

export default WrapAuthPage(ReceiptDetailPage);
