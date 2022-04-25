import styled from '@emotion/styled';
import LogoHeaderModal from "./LogoHeaderModal";

const BadgeModal = ({
  isOpen,
  onCloseClick,
  imgSize=16
}) => {

  const renderRow = (img, txt) => (
    <Row>
      <img src={img} width={imgSize} height={imgSize} />
      {txt}
    </Row>
  )

  return (
    <LogoHeaderModal
      isOpen={isOpen}
      onCloseClick={onCloseClick}
    >
      <Container>
        {renderRow('/icons/badge/badge-0.png', '무소유: 0개 등록 시')}
        {renderRow('/icons/badge/badge-1.png', '미니멀리스트 : 1~10개 등록 시')}
        {renderRow('/icons/badge/badge-11.png', '초보 수집가 : 11~20개 등록 시')}
        {renderRow('/icons/badge/badge-21.png', '프로수집가 지망생 : 21~30개 등록 시')}
        {renderRow('/icons/badge/badge-31.png', '나는야 프로수집가 : 31~40개 등록 시')}
        {renderRow('/icons/badge/badge-41.png', '진정한 수집광 : 41~50개 등록시')}
      </Container>
    </LogoHeaderModal>
  )
}

export default BadgeModal

const Container = styled.div`
  display: flex;
  flex-direction: column;

  > div {
    margin-bottom: 4px;
  }
`

const Row = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
`
