import styled from '@emotion/styled';
import Link from 'next/link';

const TopLogo = () => {
  return (
    <Container>
      <Logo>BUY2BYE</Logo>
      <Link href='/setting'>
        <Setting>
          <img src='/icons/setting.png' alt='setting' />
        </Setting>
      </Link>
    </Container>
  );
};

export default TopLogo;

const Container = styled.div`
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Logo = styled.div`
  font-size: 16px;
`;

const Setting = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  width: 60px;
  height: 60px;
  background: none;

  img {
    height: 40%;
    width: auto;
    opacity: 0.3;
  }
`;
