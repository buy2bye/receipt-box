import styled from '@emotion/styled';
import Link from 'next/link';

const BottomNav = () => {
  return (
    <Container>
      <Link href='/upload'>
        <UploadButton>
          <img src='/icons/camera.png' alt='receipt-upload' />
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

const UploadButton = styled.button`
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
    width: 70%;
  }
`;
