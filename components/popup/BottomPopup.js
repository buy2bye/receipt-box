import styled from '@emotion/styled';
import Popup from './Popup';

const BottomPopup = ({
  visible,
  setVisible,
  children,
  className,
  title,
  height = '36vh',
}) => {
  return (
    <Container
      visible={visible}
      className={className}
      setVisible={setVisible}
      height={height}
    >
      <Title>{title}</Title>
      {children}
    </Container>
  );
};

export default BottomPopup;

const Container = styled(Popup)`
  position: fixed;
  left: 0;
  border-radius: 24px 24px 0 0;
  bottom: ${(props) => (props.visible ? 0 : `-${props.height}`)};
  transition: 0.3s ease-out;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: var(--grey200);
  z-index: 99;
`;

const Title = styled.span`
  display: inline-block;
  width: 100%;
  font-size: 4vw;
  text-align: center;
  margin: 2vw 0 5vw 0;
`;
