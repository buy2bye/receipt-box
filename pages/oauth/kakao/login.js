import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { useRouter } from 'next/router';
import SNSSingup from 'components/signup/SNSSignup';
import apiController from 'helpers/apiController';
import { setCookie } from 'helpers/cookie';
import { redirect } from 'helpers/utils';
import FullScreenSpinner from 'components/common/FullScreenSpinner';

const KakaoLogin = ({ code, state }) => {
  const router = useRouter();
  const [fetchDone, setFetchDone] = useState(false);

  useEffect(() => {
    const BzTrackingId = localStorage.getItem('bz_tracking_id');

    const fetchLogin = async () => {
      const { data: tokenData } = await apiController({ isAuth: false }).post(
        '/api/auth/kakao-login',
        { code: code, bz_tracking_id: BzTrackingId }
      );

      setCookie('accessToken', tokenData.accessToken);
      setCookie('refreshToken', tokenData.refreshToken);

      const { data: userInfo } = await apiController().get('/api/user/info');
      if (userInfo.nickname) {
        router.replace(state);
      } else {
        setFetchDone(true);
      }
    };

    fetchLogin();
  }, []);

  if (!fetchDone) {
    return <FullScreenSpinner />;
  }

  return <SNSSingup redirect={state} />;
};

KakaoLogin.getInitialProps = (ctx) => {
  const { query } = ctx;
  const { code, state, error } = query;

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
    state,
  };
};

export default KakaoLogin;
