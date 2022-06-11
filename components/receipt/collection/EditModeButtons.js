import { css } from '@emotion/react';
import receiptApi from 'api/receipt';
import Button from 'components/button/Button';
import Modal from 'components/modal/Modal';
import BottomDropdown from 'components/popup/BottomDropdown';
import { useState } from 'react';

const { default: styled } = require('@emotion/styled');

const EditModeButtons = ({
  isShown,
  onClose,
  disabled,
  selectedItemsOnEditMode,
  collections,
}) => {
  const [isCollectionSelectPopupShown, setIsCollectionSelectPopupShown] =
    useState(false);
  const { changeReceiptCategory } = receiptApi();

  const handleCollectionChangeClick = () => {
    setIsCollectionSelectPopupShown(true);
  };

  const handleCollectionChangeSubmit = (selectedCollection) => {
    console.log(selectedCollection);

    const newCollection = collections.filter(
      (collection) => collection.name === selectedCollection
    )[0];

    changeReceiptCategory(selectedItemsOnEditMode, newCollection.id)
      .then(() => {
        alert('컬렉션 변경이 완료되었습니다.');
        window.location.reload();
      })
      .catch(({ response }) => {
        alert(response);
      });
  };

  return (
    <>
      <Container isShown={isShown}>
        <EditButton onClick={onClose}>닫기</EditButton>
        <EditButton
          primary={!disabled}
          disabled={disabled}
          onClick={handleCollectionChangeClick}
        >
          이동
        </EditButton>

        <CollectionSelectPopup
          visible={isCollectionSelectPopupShown}
          setVisible={setIsCollectionSelectPopupShown}
          title='이동할 컬렉션을 선택해주세요.'
          items={collections.map((item) => item.name)}
          defaultValue={collections[0].name}
          onSelect={handleCollectionChangeSubmit}
        />
      </Container>
      {isShown && <DummySpace />}
    </>
  );
};

export default EditModeButtons;

const DummySpace = styled.div`
  width: 100vw;
  height: 120px;
  flex: 1;
`

const Container = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 120px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 0%,
    #ffffff 30.85%
  );

  display: flex;
  padding: 40px 20px 20px 20px;
  gap: 8px;

  ${({ isShown }) =>
    !isShown &&
    css`
      display: none;
    `}
`;

const EditButton = styled(Button)`
  flex: 1;
  border-radius: 8px;
  height: auto;
`;

const CollectionSelectPopup = styled(BottomDropdown)``;
