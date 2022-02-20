import { useRouter } from 'next/router';
import { useEffect } from 'react';

const ReceiptDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  return <div>{id}</div>;
};

export default ReceiptDetail;
