import styled from '@emotion/styled';

const Layout = ({ children, className }) => {
  return (
    <Container>
      <Body className={className}>{children}</Body>
      <BottomNav>
        <div className='wrapper'>
          <button>
            <img src='icons/box.png' alt='receipt-box' />
            나의 보관함
          </button>
          <button>
            <img src='icons/upload.png' alt='receipt-upload' />
            영수증 등록
          </button>
        </div>
      </BottomNav>
    </Container>
  );
};

export default Layout;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Body = styled.div`
  flex: 1;
`;

const BottomNav = styled.div`
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;

  .wrapper {
    width: 80%;
    height: 80%;
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
