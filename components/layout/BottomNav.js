import { useState } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import PreviewModal from 'components/preview/PreviewModal';
import Link from 'next/link';

const BottomNav = ({ isPreview }) => {
  const router = useRouter();

  return (
    <Container>
      <Link href={isPreview ? `/create?preview=true` : '/create'} passHref>
        <UploadButton htmlFor='upload-photo'>
          <img src='/icons/plus.png' alt='receipt-upload' />
        </UploadButton>
      </Link>
    </Container>
  );
};

export default BottomNav;

const Container = styled.div`
  position: fixed;
  bottom: 40px;
  right: 40px;
`;

const UploadButton = styled.label`
  background-color: var(--primary);
  width: 55px;
  height: 55px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;

  :active {
    opacity: 0.5;
    transition: 0.4s;
  }

  img {
    width: 40%;
  }
`;

const UploadButtonPreview = styled.button`
  background-color: var(--primary);
  width: 55px;
  height: 55px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  padding: 0;

  :active {
    opacity: 0.5;
    transition: 0.4s;
  }

  img {
    width: 40%;
  }
`;
