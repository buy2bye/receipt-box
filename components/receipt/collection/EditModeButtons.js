import { css } from '@emotion/react';
import Button from 'components/button/Button';

const { default: styled } = require('@emotion/styled');

const EditModeButtons = ({ isShown, onClose, disabled }) => {
  return (
    <Container isShown={isShown}>
      <EditButton onClick={onClose}>닫기</EditButton>
      <EditButton primary={!disabled} disabled={disabled}>
        이동
      </EditButton>
    </Container>
  );
};

export default EditModeButtons;

const Container = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 120px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 0%,
    #ffffff 30.85%
  );

  display: flex;
  padding: 40px 20px 20px 20px;
  gap: 8px;
  z-index: 1000;

  ${({ isShown }) =>
    !isShown &&
    css`
      display: none;
    `}
`;

const EditButton = styled(Button)`
  flex: 1;
  border-radius: 8px;
  height: auto;
`;
