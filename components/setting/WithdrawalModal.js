import { useEffect, useState } from 'react'
import Modal from 'components/modal/Modal'
import styled from '@emotion/styled'

const WithdrawalModal = ({
  isOpen,
  onCancelClick,
  onWithdrawalClick
}) => {

  useEffect(() => {
    setReasonIndex(-1)
    setReasonValue('')
  }, [isOpen])

  const [reasonIndex, setReasonIndex] = useState()
  const [reasonValue, setReasonValue] = useState('')

  const renderRadioButton = (label, idx) => {
    return (
      <RadioButton>
        <input
          type="radio"
          id={`reason_${idx}`}
          name="reason"
          value={idx}
          checked={idx == reasonIndex}
          onChange={handleReasonChange}
        />
        <label htmlFor={`reason_${idx}`}>{label}</label>
      </RadioButton>
    )
  }

  const REASON_MAP = {
    1: '개인정보유출이 걱정되어서',
    2: '서비스가 유용하지 않아서',
    3: '자주 이용하지 않아서',
    4: '재가입을 위해서',
  }

  const handleReasonChange = (e) => {
    setReasonIndex(e.target.value)
  }

  const handleReasonTextChange = (e) => {
    setReasonValue(e.target.value)
  }

  const renderReasonOptions = () => {
    return (
      <RadioGroup
      >
        {Object.keys(REASON_MAP).map((key) => {
          return renderRadioButton(REASON_MAP[key], key)
        })}
        {renderRadioButton('직접 입력', 0)}
        <InputText
          type="text"
          value={reasonValue}
          disabled={reasonIndex != 0}
          onChange={handleReasonTextChange}
        />
      </RadioGroup>
    )
  }

  const handleWithdrawalClick = () => {
    const reason = 0 == reasonIndex ? reasonValue : REASON_MAP[reasonIndex]
    onWithdrawalClick && onWithdrawalClick(reason)
  }

  return (
    <Modal
      isOpen={isOpen}
      modalBoxStyle={{
        maxWidth: '400px',
        minWidth: '256px',
        minHeight: '140px',
        padding: '16px'
      }}
    >
      <DescriptionText>탈퇴하시는 이유가 무엇인가요? ㅠㅠ</DescriptionText>
      {renderReasonOptions()}
      <WrapButtons>
        <Button
          id="noBtn"
          variant="basic"
          onClick={onCancelClick}
        >
          취소
        </Button>
        <Button
          id="yesBtn"
          variant="primary"
          onClick={handleWithdrawalClick}
        >
          탈퇴하기
        </Button>
      </WrapButtons>
    </Modal>
  )
}

export default WithdrawalModal

const DescriptionText = styled.div`
  flex: 1;

  font-size: 16px;
  padding: 4px;
  margin-bottom: 28px;
`

const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin: 8px;
`

const RadioButton = styled.div`
  display: flex;
  margin: 8px;
`

const InputText = styled.input`
  margin: 8px;
  height: 32px;
`

const WrapButtons = styled.div`
  display: flex;
  justify-content: center;

  > button:last-child {
    margin-left: 8px;
  }
`

const Button = styled.button`
  background: white;
  width: 100%;
  height: 40px;
  border: 1px solid black;
  border-radius: 4px;
`
