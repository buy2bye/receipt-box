import styled from '@emotion/styled';
import Layout from 'components/layout/Layout';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const ReceiptDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  return <Container>{id}</Container>;
};

export default ReceiptDetail;

const Container = styled(Layout)``;
