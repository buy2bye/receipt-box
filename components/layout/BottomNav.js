import styled from '@emotion/styled';
import Link from 'next/link';

const BottomNav = () => {
  return (
    <Container>
      <div className='wrapper'>
        <Link href='/'>
          <button>
            <img src='/icons/box.png' alt='receipt-box' />
            나의 보관함
          </button>
        </Link>
        <Link href='/upload'>
          <button>
            <img src='/icons/upload.png' alt='receipt-upload' />
            영수증 등록
          </button>
        </Link>
      </div>
    </Container>
  );
};

export default BottomNav;

const Container = styled.div`
  /* position: fixed;
  bottom: 0;
  left: 0; */
  width: 100vw;
  display: flex;
  padding: 24px;
  justify-content: center;
  align-items: center;

  .wrapper {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    background: white;
    border: 1px solid var(--grey100);
    border-radius: 8px;
    padding: 4px 8px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

    button {
      width: 80px;
      border-radius: 8px;
      padding: 8px;
      background: transparent;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      font-size: 12px;
      font-weight: 300;
      cursor: pointer;

      :active {
        opacity: 0.5;
        transition: 0.4s;
      }

      img {
        width: 60%;
      }
    }
  }
`;
