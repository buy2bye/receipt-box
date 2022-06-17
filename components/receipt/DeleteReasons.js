import styled from '@emotion/styled';
import Button from 'components/button/Button';
import SelectBox from 'components/common/SelectBox';
import BottomPopup from 'components/popup/BottomPopup';
import { useState } from 'react';

const reasons = [
  '재등록을 위해서',
  '다른 상품으로 교환해서',
  '환불해서',
  '판매해서',
  '분실해서',
  '도난당해서',
  '직접 입력',
];

const DeleteReasons = ({
  visible,
  setVisible,
  onDelete,
  title='삭제하시는 이유를 알려주세요',
  hideReason
}) => {
  const [reason, setReason] = useState(reasons[0]);
  const [isFetching, setIsFetching] = useState(false);

  const handleCancel = () => {
    setVisible(false);
  };

  const handleDelete = async () => {
    setIsFetching(true);
    await onDelete(reason);
    setIsFetching(false);
    setVisible(false);
  };

  return (
    <Container
      visible={visible}
      height={hideReason ? '23vh' : '280px'}
      setVisible={() => setVisible(false)}
      title={title}
    >
      {!hideReason && (
        <SelectBox
          options={reasons}
          defaultValue={reasons[0]}
          setResult={setReason}
        />
      )}
      <ButtonsWrapper>
        <Button onClick={handleCancel}>취소</Button>
        <Button primary onClick={handleDelete} isLoading={isFetching}>
          삭제하기
        </Button>
      </ButtonsWrapper>
    </Container>
  );
};

export default DeleteReasons;

const Container = styled(BottomPopup)``;

const ButtonsWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 8px;
`;
