import styled from '@emotion/styled';

const CollectionSelector = ({
  isSelected,
  isCollectionListOpen,
  onClick,
  collection,
  children,
}) => {
  return (
    <Container isCollectionListOpen={isCollectionListOpen} onClick={onClick}>
      {collection?.name}
      {isSelected && <img src='/icons/edit.png' alt='edit' />}
      {children}
    </Container>
  );
};

export default CollectionSelector;

const Container = styled.button`
  white-space: nowrap;
  padding: 4px 16px;
  height: 32px;
  border: 1px solid var(--grey400);
  border-radius: 12px;
  opacity: ${(props) => (props.isCollectionListOpen ? 1 : 0)};
  transition: 0.4s all;
  display: flex;
  align-items: center;
  position: relative;

  img {
    width: 16px;
    padding-left: 4px;
  }

  ${(props) =>
    props.isSelected &&
    css`
      background: var(--grey200);
    `}
`;
