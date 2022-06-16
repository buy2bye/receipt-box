import styled from '@emotion/styled';
import HeaderTextModal from 'components/modal/HeaderTextModal';

const PricePopup = ({
  isOpen,
  onCloseClick,
  totalPrice,
  categoryPriceList
}) => {

  const renderRow = (header, price, index, isTitle) => {
    return (
      <Row
        key={`price__row__${index}`}
        isTitle={isTitle}
      >
        <HeaderCol>{header}</HeaderCol>
        <PriceCol>{price.toLocaleString()}원</PriceCol>
      </Row>
    );
  };

  return (
    <HeaderTextModal
      isOpen={isOpen}
      onCloseClick={onCloseClick}
      title='구매가 합계'
    >
      <Container>
        {renderRow('컬렉션 전체', totalPrice, -1, true)}
        {categoryPriceList.map((categoryPrice, index) => {
          return renderRow(
            categoryPrice.name,
            categoryPrice.price,
            index
          );
        })}
      </Container>
    </HeaderTextModal>
  )
}

export default PricePopup

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const Row = styled.div`
  display: flex;
  line-height: 150%;
  font-size: 3vw;

  ${props => props.isTitle && `
    font-weight: bold;
    line-height: 200%;
    font-size: 3.1vw;
  `}
`

const HeaderCol = styled.div`
  flex: 1;
`

const PriceCol = styled.div`
  flex: 2;
  text-align: right;
`
