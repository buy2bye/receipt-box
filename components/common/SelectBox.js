import styled from '@emotion/styled';
import { useState } from 'react';

const SelectBox = ({ options, defaultValue, className }) => {
  const [selected, setSelected] = useState('');
  const [reason, setReason] = useState(defaultValue);

  const handleOptionChange = (e) => {
    setReason(e.target.value);
    setSelected(e.target.value);
  };

  const handleTextChange = (e) => {
    setReason(e.target.value);
  };

  return (
    <Container className={className}>
      <select onChange={handleOptionChange}>
        {options.map((option) => (
          <option
            value={option}
            defaultValue={option === defaultValue}
            key={option}
          >
            {option}
          </option>
        ))}
      </select>
      <input
        type='text'
        style={
          selected === '직접 입력'
            ? { opacity: 1, height: '50px' }
            : { opacity: 0, height: 0 }
        }
        onChange={handleTextChange}
      />
    </Container>
  );
};

export default SelectBox;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;

  select {
    font-size: 14px;
    padding: 16px 12px;
    border-radius: 10px;
    border: 1px solid var(--grey400);
    appearance: none;
    background-color: white;
    background-image: url('/icons/down-arrow.png');
    background-position: 96% 50%;
    background-repeat: no-repeat;
    background-size: 14px;
    opacity: 0.7;
  }

  input {
    font-size: 14px;
    border-radius: 10px;
    border: 1px solid var(--grey400);
    transition: 0.4s;
    padding-left: 12px;
  }
`;
