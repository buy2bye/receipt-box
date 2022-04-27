import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { setCookie } from 'helpers/cookie';
import apiController from 'helpers/apiController';
import Title from 'components/page/Title';
import { isBirthYear, isEmail, isPhone } from 'helpers/validate';
import Button from 'components/button/Button';
import Layout from 'components/layout/Layout';
import Agreements from './Agreements';

import 이용약관 from 'components/signup/agreements/이용약관';
import 개인정보수집동의 from 'components/signup/agreements/개인정보수집동의';

const Signup = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [nickname, setNickname] = useState();
  const [gender, setGender] = useState();
  const [phone, setPhone] = useState();
  const [birthYear, setBirthYear] = useState();
  const [agreements, setAgreements] = useState({
    ageLimit: false,
    termsAndConditions: false,
    privacy: false,
    marketing: false,
  });
  const [agreementView, setAgreementView] = useState();

  const handleUserNameInput = (e) => {
    setUsername(e.target.value);
  };

  const handleCheckUsername = () => {
    if (!isEmail.test(username)) {
      alert('올바른 이메일을 입력해주세요.');
      return;
    }

    apiController()
      .get('/api/auth/check-username', { username: username })
      .then((res) => {
        alert('사용 가능한 아이디입니다.');
      })
      .catch(({ response: res }) => {
        if (res.status === 409) {
          alert('이미 등록된 아이디입니다.');
        }
      });
  };

  const handleCheckNickname = () => {
    if (!nickname) {
      alert('닉네임을 입력해주세요.');
      return;
    }

    apiController()
      .get('/api/auth/check-nickname', { nickname: nickname })
      .then((res) => {
        alert('사용 가능한 닉네임입니다.');
      })
      .catch(({ response: res }) => {
        if (res.status === 409) {
          alert('이미 등록된 닉네임입니다.');
        }
      });
  };

  const handleCheckPhone = () => {
    if (!isPhone.test(phone)) {
      alert('올바른 전화번호를 입력해주세요.');
      return;
    }

    apiController()
      .get('/api/auth/check-phone', { phone: phone })
      .then((res) => {
        alert('사용 가능한 휴대폰 번호입니다.');
      })
      .catch(({ response: res }) => {
        if (res.status === 409) {
          alert('이미 등록된 휴대폰 번호입니다.');
        }
      });
  };

  const handleGenderChange = (e) => {
    if (e.target.value === 'm') {
      setGender(1);
    } else {
      setGender(2);
    }
  };

  const handleViewAgreement = (type) => {
    if (type === '이용약관') {
      setAgreementView(이용약관);
    } else {
      setAgreementView(개인정보수집동의);
    }
  };

  const handleRegister = () => {
    if (!isEmail.test(username)) {
      alert('올바른 이메일을 입력해주세요.');
      return;
    }
    if (password.length < 6) {
      alert('비밀번호를 6자리 이상 입력해주세요.');
      return;
    }
    if (password !== passwordCheck) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (!nickname) {
      alert('닉네임을 입력해주세요.');
      return;
    }
    // if (!isBirthYear.test(birthYear)) {
    //   alert('출생연도 4자리를 입력해주세요.');
    //   return;
    // }
    // if (!gender) {
    //   alert('성별을 확인해주세요.');
    //   return;
    // }
    // if (!isPhone.test(phone)) {
    //   alert('올바른 전화번호를 입력해주세요.');
    //   return;
    // }
    if (
      !agreements.ageLimit ||
      !agreements.termsAndConditions ||
      !agreements.privacy
    ) {
      alert('이용 약관 동의에 체크해주세요.');
      return;
    }

    const BzTrackingId = localStorage.getItem('bz_tracking_id');

    apiController()
      .post('/api/auth/signup', {
        username: username,
        password: password,
        nickname: nickname,
        gender: gender,
        birth_year: birthYear,
        email: username,
        phone: phone,
        marketing_agreement: agreements.marketing,
        bz_tracking_id: BzTrackingId || '',
      })
      .then((res) => {
        alert('가입이 완료되었습니다.');
        apiController()
          .post('/api/auth/login', { username, password })
          .then((res) => {
            const { data } = res;
            setCookie('accessToken', data.accessToken);
            setCookie('refreshToken', data.refreshToken);
            router.query.redirect
              ? router.push(router.query.redirect)
              : router.push('/');
          });
      })
      .catch(({ response: res }) => {
        if (res.status === 409) {
          const { msgId } = res.data;
          if (msgId === 'u0102') {
            alert('이미 등록된 아이디입니다.');
          } else if (msgId === 'u0111') {
            alert('이미 등록된 닉네임입니다.');
          } else if (msgId === 'u0113') {
            alert('이미 등록된 휴대폰 번호입니다.');
          }
        }
      });
  };

  return (
    <>
      <Container
        hideBottom
        onBackClick={agreementView ? () => setAgreementView() : null}
      >
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
              placeholder='6자리 이상'
              id='password'
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor='password'>비밀번호</label>
          </TextInput>
          <TextInput>
            <input
              type='password'
              placeholder='6자리 이상'
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
              id='birth_year'
              onChange={(e) => setBirthYear(e.target.value)}
            />
            <label htmlFor='birth_year'>출생연도 4자리</label>
          </TextInput>
          <TextInput>
            <input
              type='number'
              placeholder='중고거래 매칭 알림을 보내드려요'
              id='phone'
              onChange={(e) => setPhone(e.target.value)}
            />
            <label htmlFor='phone'>휴대폰 번호 (숫자만 입력)</label>
            <PhoneAuthButton onClick={handleCheckPhone}>
              중복확인
            </PhoneAuthButton>
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
          <Agreements
            agreements={agreements}
            setAgreements={setAgreements}
            onViewAgreement={handleViewAgreement}
          />
        </SignupForm>
        <Buttons>
          <Button primary onClick={handleRegister}>
            가입하기
          </Button>
        </Buttons>
        {agreementView && <AgreementWrapper>{agreementView}</AgreementWrapper>}
      </Container>
    </>
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
  margin-bottom: 16px;
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
    width: 100%;
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
      font-size: 14px;
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
    color: var(--grey700);
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
  color: var(--grey700);
`;

const PhoneAuthButton = styled(CheckButton)`
  /* background: var(--blue50);
  color: var(--blue600); */
`;

const AgreementWrapper = styled.div`
  background: white;
  width: 100%;
  position: absolute;
  padding: 0 24px;
`;
