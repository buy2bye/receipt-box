import styled from '@emotion/styled';
import ReceiptGrid from './ReceiptGrid';

const ReceiptsGridView = ({ receiptList, onItemClick }) => {
  return (
    <Container>
      {receiptList.length < 1 && (
        <UploadGuide>
          <h3>등록된 물건이 없어요.</h3>
          <span>오른쪽 아래의 + 버튼을 눌러</span>
          <span>물건을 등록하세요!</span>
        </UploadGuide>
      )}
      {receiptList.map((item, index) => (
        <ReceiptGrid
          item={item}
          key={index}
          onClick={() => onItemClick(item)}
        />
      ))}
    </Container>
  );
};

export default ReceiptsGridView;

const Container = styled.div`
  width: 100%;
  height: auto;
  flex: 1;
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-row-gap: 8px;
  grid-column-gap: 8px;
`;

const UploadGuide = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  h3 {
    margin: 0;
    margin-bottom: 20px;
    font-size: 16px;
    color: var(--grey600);
  }

  span {
    font-size: 14px;
    line-height: 20px;
    color: var(--grey500);
  }
`;
