import styled from '@emotion/styled';
import Head from 'next/head';
import { useEffect } from 'react';

const Iamport = () => {
  useEffect(() => {
    // const IMP = window.IMP; // 생략 가능
    // if (!IMP) return;
    // IMP.init('{가맹점 식별코드}');
  }, []);

  return (
    <>
      <Container />
    </>
  );
};

export default Iamport;

const Container = styled.div`
  display: none;
`;
