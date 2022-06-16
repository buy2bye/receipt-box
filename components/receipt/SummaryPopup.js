import styled from '@emotion/styled';

const SummaryContentRow = ({ label, content }) => {
  return (
    <SummaryContentWrapper>
      <span>{label}</span>
      <span>{content}</span>
    </SummaryContentWrapper>
  );
};

const SummaryPopup = ({
    onCloseClick,
    item,
    onShowDetailClick,
    posX,
    posY,
    translateX='-50'
}) => {
  return (
    <Container posX={posX} posY={posY} translateX={translateX}>
      <CloseButton onClick={onCloseClick}>
        <img src='/icons/close-button-white.png' alt='close-button' />
      </CloseButton>
      <SummaryHeader>{item.nickname || '별명없음'}</SummaryHeader>
      <SummaryContent>
        <SummaryContentRow label='상품명' content={item.productName || '정보없음'} />
        <SummaryContentRow label='구매처' content={item.productPlace || '정보없음'} />
        <SummaryContentRow
          label='구매가'
          content={
            item.productPrice
              ? `${parseInt(item.productPrice).toLocaleString()}원`
              : '정보없음'
          }
        />
        <SummaryContentRow label='구매일자' content={item.productDate || '정보없음'} />
      </SummaryContent>
      <ShowDetailButton onClick={onShowDetailClick}>상세 보기</ShowDetailButton>
    </Container>
  );
};

export default SummaryPopup;

const Container = styled.div`
  position: absolute;
  width: 60vw;
  height: 60vw;
  top: ${(props) => props.posY-70}px;
  left: ${(props) => props.posX}px;
  transform: translate(${props => props.translateX}%, 0%);
  background: white;
  border-radius: 8px;
  z-index: 1;
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
  font-size: 3vw;
  font-weight: bold;
  width: 100%;
  height: 15vw;
  min-height: 40px;
  border-radius: 8px 8px 0 0;
  padding: 0 12px;
`;

const SummaryContent = styled.div`
  padding: 5vw;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 3vw;
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
  width: 42%;
  font-size: 3vw;
  padding: 2vw;
  border-radius: 4px;
  background: var(--primary);
  margin-bottom: 5.5vw;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 2.5vw;
  right: 2.0vw;
  width: 3vw;
  height: 3vw;
  padding: 0;

  img {
    width: 100%;
    height: 100%;
  }
`;
