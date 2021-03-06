import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

const Popup = ({
  children,
  visible,
  setVisible,
  className,
  height = '36vh',
}) => {
  useEffect(() => {
    if (visible && typeof window != 'undefined' && window.document) {
      document.body.style.overflow = 'hidden';
    }
    if (!visible) document.body.style.overflow = 'scroll';
  }, [visible]);

  return (
    <Container visible={visible}>
      <Overlay onClick={() => setVisible(!visible)} />
      <PopupWrapper visible={visible} className={className} height={height}>
        {children}
      </PopupWrapper>
    </Container>
  );
};

export default Popup;

const Container = styled.div`
  z-index: 11;
  position: fixed;
  width: 100vw;
  height: 100vh;
  bottom: ${(props) => (props.visible ? 0 : '-100vh')};
  left: 0;
`;

const Overlay = styled.div`
  z-index: 12;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
`;

const PopupWrapper = styled.div`
  z-index: 13;
  width: 100vw;
  height: ${(props) => props.height};
  background: white;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transition: 0.4s ease-out;
  padding: 6vw;
`;
