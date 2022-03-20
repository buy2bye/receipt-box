import styled from '@emotion/styled';
import PreviewModal from 'components/preview/PreviewModal';
import { ImageContext } from 'contexts/ImageContext';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';

const BottomNav = ({ isPreview }) => {
  const { imageSrc, changeImageSrc, imageFile, changeImageFile } =
    useContext(ImageContext);
  const router = useRouter();
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  const handleImageUpload = (e) => {
    const reader = new FileReader();
    const files = e.target.files;

    reader.onload = function (e) {
      // 썸네일 이미지 경로 설정
      changeImageSrc(e.target.result);
    };

    if (files[0]) {
      reader.readAsDataURL(files[0]);
      changeImageFile(files[0]);
    }
  };

  const handleOnImageChange = (e) => {
    handleImageUpload(e);
    router.push('/upload');
  };

  if (isPreview)
    return (
      <Container>
        <UploadButtonPreview
          onClick={() => {
            setIsPreviewModalOpen(true);
          }}
        >
          <img src='/icons/camera.png' alt='receipt-upload' />
        </UploadButtonPreview>
        <PreviewModal
          text='영수증 등록을 위해서는 로그인이 필요합니다.'
          isOpen={isPreviewModalOpen}
          setIsOpen={setIsPreviewModalOpen}
        />
      </Container>
    );

  return (
    <Container>
      <input
        type='file'
        id='upload-photo'
        accept='image/*'
        onChange={handleOnImageChange}
      />
      <UploadButton htmlFor='upload-photo'>
        <img src='/icons/camera.png' alt='receipt-upload' />
      </UploadButton>
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
  width: 68px;
  height: 68px;
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
    width: 60%;
  }
`;

const UploadButtonPreview = styled.button`
  background-color: var(--primary);
  width: 68px;
  height: 68px;
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
    width: 60%;
  }
`;
