import styled from '@emotion/styled';
import receiptApi from 'api/receipt';
import Layout from 'components/layout/Layout';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const ReceiptDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [receipt, setReceipt] = useState();

  useEffect(() => {
    const { getReceiptDetail } = receiptApi();

    getReceiptDetail(id).then((data) => setReceipt(data.data));
  }, []);

  console.log(receipt);

  return <Container>{id}</Container>;
};

export default ReceiptDetail;

const Container = styled(Layout)``;
