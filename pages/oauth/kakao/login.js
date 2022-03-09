import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { useRouter } from 'next/router';
import SNSSingup from 'components/signup/SNSSignup';
import apiController from 'helpers/apiController';
import { setCookie } from 'helpers/cookie';
import { redirect } from 'helpers/utils';
import FullScreenSpinner from 'components/common/FullScreenSpinner';

const KakaoLogin = ({ code }) => {
  const router = useRouter();
  const [fetchDone, setFetchDone] = useState(false);

  const fetchLogin = async () => {
    const { data: tokenData } = await apiController({ isAuth: false }).post(
      '/api/auth/kakao-login',
      { code }
    );

    setCookie('accessToken', tokenData.accessToken);
    setCookie('refreshToken', tokenData.refreshToken);

    const { data: userInfo } = await apiController().get('/api/user/info');
    if (userInfo.nickname) {
      router.push('/');
    } else {
      setFetchDone(true);
    }
  };

  useEffect(() => {
    fetchLogin();
  }, []);

  if (!fetchDone) {
    return <FullScreenSpinner />;
  }

  return <SNSSingup />;
};

KakaoLogin.getInitialProps = (ctx) => {
  const { query } = ctx;
  const { code, error } = query;

  const LOGIN_REQUIRED_ERRORS = [
    'login_required',
    'consent_required',
    'interaction_required',
  ];

  if (error === 'access_denied') {
    // User denied access or Not allowed under age 14
    // redirec to login page
    redirect('/login', ctx);
  } else if (_.includes(LOGIN_REQUIRED_ERRORS, error)) {
    // TODO When?
  }
  return {
    code,
  };
};

export default KakaoLogin;
