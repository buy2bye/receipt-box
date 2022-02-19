import React, { useState } from 'react'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'

import apiController from 'helpers/apiController'
import Title from 'components/page/Title'

const Signup = () => {
  const router = useRouter()

  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [passwordCheck, setPasswordCheck] = useState()
  const [nickname, setNickname] = useState()
  const [gender, setGender] = useState()
  const [birthDate, setBirthDate] = useState()

  const handleCheckUsername = () => {
    if (username) {
      apiController().get(
        '/api/auth/check-username',
        { username: username }
      ).then(res => {
        alert('사용 가능한 아이디입니다.')
      }).catch(({ response: res }) => {
        if (res.status === 409) {
          alert('중복된 아이디입니다.')
        }
      })
    }
  }

  const handleCheckNickname = () => {
    if (nickname) {
      apiController().get(
        '/api/auth/check-nickname',
        { nickname: nickname }
      ).then(res => {
        alert('사용 가능한 닉네임입니다.')
      }).catch(({ response: res }) => {
        if (res.status === 409) {
          alert('중복된 닉네임입니다.')
        }
      })
    }
  }

  const handleGenderChange = (e) => {
    if (e.target.value === 'm') {
      setGender(1)
    } else {
      setGender(2)
    }
  }

  const handleRegister = () => {
    if (password !== passwordCheck) {
      alert('비밀번호가 다릅니다. 확인해주세요!')
      return
    }
    if (!username) {
      alert('아이디를 입력해주세요!')
      return
    }
    if (!nickname) {
      alert('닉네임을 입력해주세요!')
      return
    }
    if (!gender) {
      alert('성별을 입력해주세요!')
      return
    }
    if (!birthDate) {
      alert('생년월일을 입력해주세요!')
      return
    }
    const birthYear = parseInt(birthDate.slice(0, 4))
    apiController().post(
      '/api/auth/signup',
      {
        username: username,
        password: password,
        nickname: nickname,
        gender: gender,
        birth_year: birthYear,
        email: username
      }
    ).then((res) => {
      alert('가입이 완료되었습니다.')
      router.push('/login')
    }).catch(({ response: res }) => {
      if (res.status === 409) {
        const { msgId } = res.data
        if (msgId === 'u0102') {
          alert('중복된 아이디입니다.')
        } else if (msgId === 'u0111') {
          alert('중복된 닉네임입니다.')
        }
      }
    })
  }

  const handleLater = () => {
    router.push('/login')
  }

  return (
    <Container>
      <Title>회원 가입</Title>
      <SignupForm>
        <TextInput>
          <input type="text" placeholder="" id="username" onChange={(e) => setUsername(e.target.value)} />
          <label htmlFor="username">로그인 아이디</label>
          <CheckButton onClick={handleCheckUsername}>중복확인</CheckButton>
        </TextInput>
        <TextInput>
          <input type="password" placeholder="" id="password" onChange={(e) => setPassword(e.target.value)} />
          <label htmlFor="password">비밀번호</label> 
        </TextInput>
        <TextInput>
          <input type="password" placeholder="" id="password_check" onChange={(e) => setPasswordCheck(e.target.value)} />
          <label htmlFor="password_check">비밀번호 확인</label> 
        </TextInput>
        <TextInput>
          <input type="text" placeholder="" id="nickname" onChange={(e) => setNickname(e.target.value)} />
          <label htmlFor="nickname">닉네임</label>
          <CheckButton onClick={handleCheckNickname}>중복확인</CheckButton>
        </TextInput>
        <RadioGroup>
          <div className="title">성별</div>
          <input type="radio" id="gender_m" name="gender" value="m" onChange={handleGenderChange} />
          <label htmlFor="gender_m">남자</label>
          <input type="radio" id="gender_f" name="gender" value="f" onChange={handleGenderChange} />
          <label htmlFor="gender_f">여자</label>
        </RadioGroup>
        <TextInput>
          <input type="date" placeholder="" id="birth_date" onChange={(e) => setBirthDate(e.target.value)} />
          <label htmlFor="birth_date">생년월일</label>
        </TextInput>
        {/*
        TODO 핸드폰 본인인증 관련 내용
        약관 동의
        */}
      </SignupForm>
      <Buttons>
        <button
          className='login__login-button primary'
          onClick={handleRegister}
        >
          가입하기
        </button>
        <button className='login__login-button secondary' onClick={handleLater}>
          나중에
        </button>
      </Buttons>
    </Container>
  )
}

export default Signup

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  padding: 20px 20px 80px 20px;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SignupForm = styled.div`
  flex: 1;
`

const TextInput = styled.div`
  position: relative;
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
`

const RadioGroup = styled.div`
  position: relative;

  .title {
    color: var(--grey700);
  }

  input {
  }
`

const Buttons = styled.div`
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
  .primary {
    background: var(--blue500);
    border-color: var(--blue500);
    color: white;
  }

  .secondary {
    background: var(--grey100);
    border-color: var(--grey100);
    color: black;
  }
`;

const CheckButton = styled.button`
  width: 100px;
  height: 40px;
  border-radius: 16px;
  font-size: 16px;
  background: var(--grey100);
  border-color: var(--grey100);
  color: black;
`
