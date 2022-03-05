import styled from '@emotion/styled';
import Button from 'components/button/Button';
import SelectBox from 'components/common/SelectBox';
import BottomPopup from 'components/popup/BottomPopup';
import { useState } from 'react';

const reasons = [
  '개인정보유출이 걱정되어서',
  '서비스가 유용하지 않아서',
  '자주 이용하지 않아서',
  '재가입을 위해서',
  '직접 입력',
];

const WithdrawalReasons = ({ visible, setVisible, onWithdrawal }) => {
  const [reason, setReason] = useState(reasons[0]);
  const [isFetching, setIsFetching] = useState(false);

  const handleCancel = () => {
    setVisible(false);
  };

  const handleWithdrawal = async () => {
    setIsFetching(true);
    await onWithdrawal(reason);
    setIsFetching(false);
    setVisible(false);
  };

  return (
    <Container
      visible={visible}
      height='280px'
      setVisible={() => setVisible(false)}
      title='탈퇴하시는 이유를 알려주세요'
    >
      <SelectBox
        options={reasons}
        defaultValue={reasons[0]}
        setResult={setReason}
      />
      <ButtonsWrapper>
        <Button onClick={handleCancel}>취소</Button>
        <Button primary onClick={handleWithdrawal} isLoading={isFetching}>
          탈퇴하기
        </Button>
      </ButtonsWrapper>
    </Container>
  );
};

export default WithdrawalReasons;

const Container = styled(BottomPopup)``;

const ButtonsWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 8px;
`;
