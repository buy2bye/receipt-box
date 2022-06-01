import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Button from 'components/button/Button';
import BottomPopup from './BottomPopup';

const BottomTextInputPopup = ({
  visible,
  setVisible,
  className,
  buttonClass,
  title,
  onSubmit,
  placeholder,
  value,
  confirmText = '다음',
  type = 'text'
}) => {
  const [isFetching, setIsFetching] = useState(false);
  const [innerValue, setInnerValue] = useState(value);

  useEffect(() => {
    if (!visible) {
      setInnerValue('')
    } else {
      setInnerValue(value);
    }
  }, [value, visible])

  const handleClick = async () => {
    setIsFetching(true);
    await onSubmit(innerValue);
    setIsFetching(false);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) handleClick();
  };
  
  const handleChange = (e) => [
    setInnerValue(e.target.value)
  ]

  return (
    <Container
      visible={visible}
      className={className}
      setVisible={setVisible}
      title={title}
    >
      {type === 'textarea' ? (
        <TextArea
          placeholder={placeholder}
          onChange={handleChange}
          // onKeyDown={handleKeyDown}
          value={innerValue}
        />
      ) : (
        <TextInput
          type={type}
          placeholder={placeholder}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          value={innerValue}
        />
      )}
      <Button
        className={buttonClass}
        primary
        onClick={handleClick}
        isLoading={isFetching}
      >
        {confirmText}
      </Button>
    </Container>
  );
};

export default BottomTextInputPopup;

const Container = styled(BottomPopup)``;

const TextInput = styled.input`
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

const TextArea = styled.textarea`
  width: 100%;
  height: 160px;
  resize: none;
  border: 1px solid var(--grey300);
  background: var(--grey100);
  border-radius: 8px;
  font-size: 18px;
  padding: 16px;
  font-weight: 300;
  color: var(--grey800);
`;
