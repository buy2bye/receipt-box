import styled from '@emotion/styled';

const Toggle = ({ onToggle, toggleState, id }) => {
  return (
    <Container id={id}>
      <input
        type='checkbox'
        onChange={onToggle}
        checked={toggleState}
        readOnly
      />
      <span />
    </Container>
  );
};

export default Toggle;

const Container = styled.label`
  width: 8vw;
  height: 4vw;
  position: relative;
  display: inline-block;

  input {
    opacity: 0;
    width: 0;
    height: 0;

    :checked + span {
      background-color: var(--primary);

      :before {
        -webkit-transform: translateX(24px);
        -ms-transform: translateX(24px);
        transform: translateX(24px);
      }
    }
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 20px;
    background-color: var(--grey300);
    -webkit-transition: 0.4s;
    transition: 0.4s;

    :before {
      position: absolute;
      content: '';
      height: 3.6vw;
      width: 3.6vw;
      left: 1.1vw;
      bottom: 0.3vw;
      background-color: white;
      -webkit-transition: 0.4s;
      transition: 0.4s;
      border-radius: 50%;
    }
  }
`;
