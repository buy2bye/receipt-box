import styled from '@emotion/styled';
import Link from 'next/link';

const TopLogo = ({ hideSetting, isPreview }) => {
  if (isPreview)
    return (
      <Container>
        <Logo>
          <img src='/icons/logo_300.png' alt='buy2bye logo' />
        </Logo>
        <Setting onClick={() => alert('둘러보기에서는 설정이 불가능해요')}>
          <img src='/icons/setting.png' alt='setting' />
        </Setting>
      </Container>
    );

  return (
    <Container>
      <Logo>
        <img src='/icons/logo_300.png' alt='buy2bye logo' />
      </Logo>
      {!hideSetting && (
        <Link href='/setting'>
          <Setting>
            <img src='/icons/setting.png' alt='setting' />
          </Setting>
        </Link>
      )}
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
  position: sticky;
`;

const Logo = styled.div`
  width: 100px;
  img {
    width: 100%;
    height: auto;
  }
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
