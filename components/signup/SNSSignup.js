import React, { useState } from 'react'
import { useRouter } from 'next/router'
import styled from '@emotion/styled';

import apiController from 'helpers/apiController';

const SNSSingup = () => {
  const router = useRouter()
  const [nickname, setNickname] = useState('')

  const handleRegister = () => {
    if (nickname.length === 0) {
      alert('닉네임을 입력해주세요!')
      return
    }

    apiController().post(
      '/api/user/set-nickname',
      { nickname: nickname }
    ).catch(error => {
      const { status } = error.response
      console.log("status code", status)
      alert('닉네임이 중복됩니다!')
    }).then(res => {
      router.push('/')
    })
  }

  const handleLater = () => {
    // TODO 이거 필요할까?
  }

  const handleChangeNickname = (e) => {
    setNickname(e.target.value)
  }

  return (
    <Container>
      SNS Signup
      <Title>
        고객님의 닉네임을 설정해주세요.
      </Title>
      <NicknameForm>
        <div className='inputLabel'>
          <input
            type='text'
            placeholder='슬로우버드'
            id='nickname'
            onChange={handleChangeNickname}
          />
        </div>
      </NicknameForm>
      <button
        className='login__login-button normal'
        onClick={handleRegister}
      >
        가입하기
      </button>
      <button
        className='login__login-button normal'
        onClick={handleLater}
      >
        나중에
      </button>
    </Container>
  )
}

export default SNSSingup

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  padding: 20px 20px 80px 20px;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;

  .login__login-button {
    width: 400px;
    max-width: 100%;
    height: 60px;
    margin-bottom: 12px;
    border-radius: 16px;
    font-size: 16px;
    font-weight: 400;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    :active {
      opacity: 0.6;
    }
  }
  .normal {
    background: var(--grey100);
    border-color: var(--grey100);
    color: black;
  }
`

const Title = styled.h2``

const NicknameForm = styled.div`
  .inputLabel {
    position: relative;
    width: 100%;
    font-size: 14px;

    label {
      position: absolute;
      top: 8px;
      left: 12px;
      color: var(--grey700);
    }

    input {
      width: 400px;
      max-width: 100%;
      height: 60px;
      margin-bottom: 12px;
      border-radius: 16px;
      padding: 24px 12px 0 12px;
      font-size: 16px;
      font-weight: 400;
      border: none;
      border: 1px solid var(--grey400);
      color: var(--grey900);
      font-weight: 300;

      ::placeholder {
        color: var(--grey400);
        font-weight: 300;
      }
    }
}
`
