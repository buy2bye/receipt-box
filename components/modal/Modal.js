import ReactDOM from 'react-dom'
import styled from '@emotion/styled'

const Modal = ({
  isOpen,
  isPortal,
  modalBoxStyle,
  children
}) => {
  const render = () => (
    <>
      <Overlay />
      <Container>
        <ModalBox style={modalBoxStyle}>
          {children}
        </ModalBox>
      </Container>
    </>
  )
  return (
    isOpen && (
      isPortal ?
      ReactDOM.createPortal(render(), document.body) :
      render()
    )
  )
}

export default Modal

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  opacity: 0.6;
  background-color: black;
  z-index: 1000;
`

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001;
`

const ModalBox = styled.div`
  border-radius: 4px;
  box-shadow: 0 2px 18px 0 rgba(109, 120, 132, 0.28);
  background-color: white;
`
