import styled from '@emotion/styled';
import Button from 'components/button/Button';
import SelectBox from 'components/common/SelectBox';
import BottomPopup from 'components/popup/BottomPopup';
import { useEffect, useState } from 'react';

const BottomDropdown = ({
  title,
  visible,
  setVisible,
  items,
  defaultValue,
  onSelect,
}) => {
  useEffect(() => {
    setSelectedItem(defaultValue || items[0]);
  }, [visible]);

  const [selectedItem, setSelectedItem] = useState(defaultValue);
  const [isFetching, setIsFetching] = useState(false);

  const handleCancel = () => {
    setVisible(false);
  };

  const handleSubmit = async () => {
    setIsFetching(true);
    await onSelect(selectedItem);
    setIsFetching(false);
    setVisible(false);
  };

  return (
    <Container
      visible={visible}
      height='280px'
      setVisible={() => setVisible(false)}
      title={title}
    >
      <SelectBox
        options={items}
        defaultValue={defaultValue}
        setResult={setSelectedItem}
      />
      <ButtonsWrapper>
        <Button onClick={handleCancel}>취소</Button>
        <Button primary onClick={handleSubmit} isLoading={isFetching}>
          선택하기
        </Button>
      </ButtonsWrapper>
    </Container>
  );
};

export default BottomDropdown;

const Container = styled(BottomPopup)``;

const ButtonsWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 8px;
`;
