import { css } from '@emotion/react';
import styled from '@emotion/styled';
import CollectionSelector from './CollectionSelector';

const CollectionList = ({
  isOpen,
  collections,
  selectedCollectionId,
  handleCreateCollectionButtonClick,
  handleSelectedCollectionChange,
}) => {
  return (
    <Container isOpen={isOpen}>
      {collections.map((collection, index) => (
        <CollectionSelector
          key={`category_${index}`}
          isSelected={selectedCollectionId === collection.id}
          isCollectionListOpen={isOpen}
          onClick={() => handleSelectedCollectionChange(collection.id)}
          collection={collection}
        />
      ))}
      <CreateCollectionButton
        isCollectionListOpen={isOpen}
        onClick={handleCreateCollectionButtonClick}
      >
        +
      </CreateCollectionButton>
    </Container>
  );
};

export default CollectionList;

const Container = styled.div`
  width: 100%;
  display: flex;
  gap: 8px;
  overflow-x: scroll;
  transition: 0.4s all;

  ${(props) =>
    props.isOpen
      ? css`
          height: 48px;
          padding-bottom: 48px;
        `
      : css`
          height: 0;
        `}
`;

const CreateCollectionButton = styled(CollectionSelector)``;
