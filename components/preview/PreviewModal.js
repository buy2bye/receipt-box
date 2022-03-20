import ConfirmModal from 'components/modal/ConfirmModal';
import { useRouter } from 'next/router';
import { useState } from 'react';

const PreviewModal = ({ text, isOpen, setIsOpen }) => {
  const router = useRouter();

  return (
    <ConfirmModal
      isOpen={isOpen}
      yesText='로그인하기'
      onYesClick={() => router.push('/login')}
      noText='좀 더 둘러보기'
      onNoClick={() => setIsOpen(false)}
      descriptionText={text}
    />
  );
};

export default PreviewModal;
