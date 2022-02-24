import styled from '@emotion/styled';
import Popup from './Popup';

const BottomPopup = ({ visible, setVisible, children, className, title }) => {
  return (
    <Container visible={visible} className={className} setVisible={setVisible}>
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
  bottom: ${(props) => (props.visible ? 0 : '-36vh')};
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
  font-size: 18px;
  text-align: center;
`;
