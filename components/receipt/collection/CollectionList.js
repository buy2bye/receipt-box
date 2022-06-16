import { css } from '@emotion/react';
import styled from '@emotion/styled';
import CollectionSelector from './CollectionSelector';

const CollectionList = ({
  isOpen,
  collectionEditMode,
  collections,
  selectedCollectionId,
  handleCreateCollectionButtonClick,
  handleSelectedCollectionChange,
  handleOrderChange,
  orderList,
  orderValue,
}) => {
  const handleSelectorClick = (collectionId) => {
    handleSelectedCollectionChange(collectionId);
  };

  return (
    <Container isOpen={isOpen}>
      <ListContainer>
        <CollectionSelector
          key={`category_all`}
          isSelected={selectedCollectionId === null}
          isCollectionListOpen={isOpen}
          collectionEditMode={collectionEditMode}
          onClick={handleSelectorClick}
          collection={null}
        />
        {collections.map((collection, index) => (
          <CollectionSelector
            key={`category_${index}`}
            isSelected={selectedCollectionId === collection.id}
            isCollectionListOpen={isOpen}
            collectionEditMode={collectionEditMode}
            onClick={handleSelectorClick}
            collection={collection}
          />
        ))}
        <CreateCollectionButton
          isCollectionListOpen={isOpen}
          onClick={handleCreateCollectionButtonClick}
        >
          +
        </CreateCollectionButton>
      </ListContainer>
      <OrderSelect isCollectionListOpen={isOpen}>
        <select value={orderValue} onChange={handleOrderChange}>
          {orderList.map(
            (order, idx) => {
              return (
                <option
                  key={`order__${idx}`}
                  value={order}
                  defaultValue={orderValue === order}
                >
                  {order}
                </option>
              );
            }
          )}
        </select>
      </OrderSelect>
    </Container>
  );
};

export default CollectionList;

const Container = styled.div`
  width: 100%;
  display: flex;
  overflow-y: clip;
  transition: 0.4s all;
  gap: 8px;

  ${(props) =>
    props.isOpen
      ? css`
          height: 8vw;
          padding-bottom: 4.8vw;
          margin-bottom: 4.0vw;
        `
      : css`
          height: 0;
          margin-bottom: 4.0vw;
        `}
`;

const ListContainer = styled.div`
  display: flex;
  flex: 1;
  gap: 1.4vw;
  overflow-x: scroll;
  height: 8vw;
`;

const CreateCollectionButton = styled.button`
  white-space: nowrap;
  padding: 4px 16px;
  height: 6vw;
  border: 1px solid var(--grey400);
  border-radius: 12px;
  opacity: ${(props) => (props.isCollectionListOpen ? 1 : 0)};
  transition: 0.4s all;
  display: flex;
  align-items: center;
  position: relative;
  font-size: 3.5vw;

  img {
    width: 16px;
    padding-left: 4px;
  }
`;

const OrderSelect = styled.div`
  opacity: ${(props) => (props.isCollectionListOpen ? 1 : 0)};
  transition: 0.4s all;

  select {
    width: 20vw;
    height: 6vw;
    font-size: 3.0vw;
    text-align: right;
    padding: 0.2vw 6vw 0.2vw 0px;
    border-radius: 12px;
    border: none;
    color: var(--grey900);
    appearance: none;
    background-image: url('/icons/down-arrow.png');
    background-position: 96% 50%;
    background-repeat: no-repeat;
    background-size: 3.6vw;
    background-color: #FFFFFF00;
    opacity: 0.7;
  }
`;
