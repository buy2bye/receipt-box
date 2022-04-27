import styled from '@emotion/styled';
import TopNav from 'components/layout/TopNav';
import Button from 'components/button/Button';

const UploadPreview = ({
  imageSrc,
  onUploadClick,
  onBackClick
}) => {

  return (
    <Container>
      <TopNav onBackClick={onBackClick} />
      <Body>
        <UploadNotice>
          <h2></h2>
          <h2></h2>
          <h3></h3>
        </UploadNotice>
        <Thumbnail>
          <img src={imageSrc} alt='receipt-thumbnail' />
        </Thumbnail>
        <ButtonsWrapper>
          <Button
            primary
            onClick={onUploadClick}
            className='receipt-register'
          >
            사진 올리기
          </Button>
        </ButtonsWrapper>
      </Body>
    </Container>
  )
};

export default UploadPreview;

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background: white;
  z-index: 100;
`;

const Body = styled.div`
  padding: 12px 24px 24px 24px;
`

const UploadNotice = styled.div`
  margin: 0;
  width: 100%;
  h2 {
    margin: 0;
    width: 100%;
    font-size: 18px;
    font-weight: 800;
    color: black;
    span {
      background-color: var(--primary);
    }
  }

  h3 {
    margin: 0 0 10px 0;
    width: 100%;
    font-size: 14px;
    font-weight: 400;
    color: black;
  }
`;

const Thumbnail = styled.div`
  width: 100%;
  height: 360px;
  border-radius: 8px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 24px;

  span {
    font-size: 14px;
    text-align: center;
    color: var(--grey300);
    line-height: 1.6;
  }

  img {
    height: 100%;
    width: 100%;
    object-fit: contain;
    border-radius: 8px;
  }
`;

const ButtonsWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 8px;
  position: fixed;
  bottom: 24px;
  left: 24px;
  width: calc(100% - 48px);
`;
