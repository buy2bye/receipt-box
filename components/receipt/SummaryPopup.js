import styled from '@emotion/styled';

const SummaryContentRow = ({ label, content }) => {
  return (
    <SummaryContentWrapper>
      <span>{label}</span>
      <span>{content}</span>
    </SummaryContentWrapper>
  );
};

const SummaryPopup = ({ onCloseClick, item, onShowDetailClick }) => {
  return (
    <Container>
      <CloseButton onClick={onCloseClick}>
        <img src='/icons/close-button-white.png' alt='close-button' />
      </CloseButton>
      <SummaryHeader>{item.nickname}</SummaryHeader>
      <SummaryContent>
        <SummaryContentRow label='모델' content={item.productName} />
        <SummaryContentRow label='구매가' content={item.productPrice} />
        <SummaryContentRow label='구매일자' content={item.productDate} />
        <SummaryContentRow label='구매처' content={item.productPlace} />
      </SummaryContent>
      <ShowDetailButton onClick={onShowDetailClick}>상세 보기</ShowDetailButton>
    </Container>
  );
};

export default SummaryPopup;

const Container = styled.div`
  position: fixed;
  width: 240px;
  height: 240px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: 8px;
  z-index: 100;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SummaryHeader = styled.div`
  background: black;
  color: white;
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 300;
  width: 100%;
  height: 40px;
  min-height: 40px;
  border-radius: 8px 8px 0 0;
  padding: 0 8px;
`;

const SummaryContent = styled.div`
  padding: 20px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 14px;
  font-weight: 300;
  box-sizing: border-box;
`;

const SummaryContentWrapper = styled.div`
  width: 100%;
  display: flex;

  span:first-of-type {
    width: 40%;
  }

  span:last-of-type {
    width: 60%;
  }
`;

const ShowDetailButton = styled.button`
  width: 100px;
  font-size: 14px;
  padding: 8px;
  border-radius: 4px;
  background: var(--primary);
  margin-bottom: 20px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 16px;
  height: 16px;
  padding: 0;

  img {
    width: 100%;
    height: 100%;
  }
`;
