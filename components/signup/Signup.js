import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';

import apiController from 'helpers/apiController';
import Title from 'components/page/Title';
import { isEmail } from 'helpers/validate';
import Button from 'components/button/Button';
import Layout from 'components/layout/Layout';

const Signup = () => {
  const router = useRouter();

  const [username, setUsername] = useState({
    value: '',
    valid: false,
  });
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [nickname, setNickname] = useState();
  const [gender, setGender] = useState();
  const [birthDate, setBirthDate] = useState();

  const handleUserNameInput = (e) => {
    if (isEmail.test(e.target.value)) setUsername(e.target.value);
  };

  const handleCheckUsername = () => {
    if (username) {
      apiController()
        .get('/api/auth/check-username', { username: username })
        .then((res) => {
          alert('사용 가능한 아이디입니다.');
        })
        .catch(({ response: res }) => {
          if (res.status === 409) {
            alert('중복된 아이디입니다.');
          }
        });
    }
  };

  const handleCheckNickname = () => {
    if (nickname) {
      apiController()
        .get('/api/auth/check-nickname', { nickname: nickname })
        .then((res) => {
          alert('사용 가능한 닉네임입니다.');
        })
        .catch(({ response: res }) => {
          if (res.status === 409) {
            alert('중복된 닉네임입니다.');
          }
        });
    }
  };

  const handleGenderChange = (e) => {
    if (e.target.value === 'm') {
      setGender(1);
    } else {
      setGender(2);
    }
  };

  const handleRegister = () => {
    if (password !== passwordCheck) {
      alert('비밀번호가 다릅니다. 확인해주세요!');
      return;
    }
    if (!username.value) {
      alert('아이디를 입력해주세요!');
      return;
    }
    if (!nickname) {
      alert('닉네임을 입력해주세요!');
      return;
    }
    if (!gender) {
      alert('성별을 입력해주세요!');
      return;
    }
    if (!birthDate) {
      alert('생년월일을 입력해주세요!');
      return;
    }
    const birthYear = parseInt(birthDate.slice(0, 4));
    apiController()
      .post('/api/auth/signup', {
        username: username,
        password: password,
        nickname: nickname,
        gender: gender,
        birth_year: birthYear,
        email: username,
      })
      .then((res) => {
        alert('가입이 완료되었습니다.');
        router.push('/login');
      })
      .catch(({ response: res }) => {
        if (res.status === 409) {
          const { msgId } = res.data;
          if (msgId === 'u0102') {
            alert('중복된 아이디입니다.');
          } else if (msgId === 'u0111') {
            alert('중복된 닉네임입니다.');
          }
        }
      });
  };

  return (
    <Container hideBottom>
      <Title>회원 가입</Title>
      <SignupForm>
        <TextInput>
          <input
            type='text'
            placeholder=''
            id='username'
            onChange={handleUserNameInput}
          />
          <label htmlFor='username'>이메일</label>
          <CheckButton onClick={handleCheckUsername}>중복확인</CheckButton>
        </TextInput>
        <TextInput>
          <input
            type='password'
            placeholder=''
            id='password'
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor='password'>비밀번호</label>
        </TextInput>
        <TextInput>
          <input
            type='password'
            placeholder=''
            id='password_check'
            onChange={(e) => setPasswordCheck(e.target.value)}
          />
          <label htmlFor='password_check'>비밀번호 확인</label>
        </TextInput>
        <TextInput>
          <input
            type='text'
            placeholder=''
            id='nickname'
            onChange={(e) => setNickname(e.target.value)}
          />
          <label htmlFor='nickname'>닉네임</label>
          <CheckButton onClick={handleCheckNickname}>중복확인</CheckButton>
        </TextInput>
        <TextInput>
          <input
            type='number'
            placeholder=''
            id='birth_date'
            onChange={(e) => setBirthDate(e.target.value)}
          />
          <label htmlFor='birth_date'>생년월일 6자리</label>
        </TextInput>
        <RadioGroup>
          <div className='title'>성별</div>
          <div className='genders'>
            <input
              type='radio'
              id='gender_m'
              name='gender'
              value='m'
              onChange={handleGenderChange}
            />
            <label htmlFor='gender_m'>남자</label>
            <input
              type='radio'
              id='gender_f'
              name='gender'
              value='f'
              onChange={handleGenderChange}
            />

            <label htmlFor='gender_f'>여자</label>
          </div>
        </RadioGroup>
        {/*
        TODO 핸드폰 본인인증 관련 내용
        약관 동의
        */}
      </SignupForm>
      <Buttons>
        <Button primary onClick={handleRegister}>
          가입하기
        </Button>
      </Buttons>
    </Container>
  );
};

export default Signup;

const Container = styled(Layout)``;

const SignupForm = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 32px;
`;

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
    border-radius: 8px;
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
`;

const RadioGroup = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  gap: 4px;

  .title {
    color: var(--grey700);
    font-size: 14px;
    padding-left: 12px;
  }

  input {
    display: none;
  }

  label {
    font-size: 14px;
    margin-right: 4px;
    padding: 10px 20px;
    background: var(--grey100);
    border-radius: 4px;
    color: var(--grey500);
    transition: 0.4s;
  }

  input:checked + label {
    background: var(--blue50);
    color: var(--blue600);
  }
`;

const Buttons = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const CheckButton = styled.button`
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translateY(-50%);
  width: 72px;
  height: 32px;
  border-radius: 8px;
  font-size: 12px;
  background: var(--grey100);
  border-color: var(--grey100);
  color: var(--grey800);
`;
