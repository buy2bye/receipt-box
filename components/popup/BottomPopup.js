import styled from '@emotion/styled';
import Popup from './Popup';

const BottomPopup = ({ visible, setVisible, children, className }) => {
  return (
    <Container visible={visible} className={className} setVisible={setVisible}>
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
`;
