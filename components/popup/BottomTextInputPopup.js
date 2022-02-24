import styled from '@emotion/styled';
import Button from 'components/button/Button';
import BottomPopup from './BottomPopup';

const BottomTextInputPopup = ({
  visible,
  setVisible,
  className,
  title,
  onInputChange,
  onSubmit,
  placeholder,
}) => {
  const handleKeyDown = (e) => {
    if (e.keyCode === 13) onSubmit();
  };

  return (
    <Container
      visible={visible}
      className={className}
      setVisible={setVisible}
      title={title}
    >
      <TextInput
        type='text'
        placeholder={placeholder}
        onChange={onInputChange}
        onKeyDown={handleKeyDown}
      />
      <Button primary onClick={onSubmit}>
        다음
      </Button>
    </Container>
  );
};

export default BottomTextInputPopup;

const Container = styled(BottomPopup)``;

const TextInput = styled.input`
  margin-top: 24px;
  width: 100%;
  height: 60px;
  border: 1px solid var(--grey300);
  background: var(--grey100);
  border-radius: 8px;
  font-size: 18px;
  padding: 0 16px;
  font-weight: 300;
  color: var(--grey800);
`;
