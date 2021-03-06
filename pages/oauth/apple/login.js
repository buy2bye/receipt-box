import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import parse from 'urlencoded-body-parser';
import { useRouter } from 'next/router';
import SNSSingup from 'components/signup/SNSSignup';
import apiController from 'helpers/apiController';
import { setCookie } from 'helpers/cookie';
import { redirect } from 'helpers/utils';
import FullScreenSpinner from 'components/common/FullScreenSpinner';

const AppleLogin = ({ code, state, idToken }) => {
  const router = useRouter();
  const [fetchDone, setFetchDone] = useState(false);

  useEffect(() => {
    const BzTrackingId = localStorage.getItem('bz_tracking_id');

    const fetchLogin = async () => {
      const { data: tokenData } = await apiController({ isAuth: false }).post(
        '/api/auth/apple-login',
        { code: code, id_token: idToken, bz_tracking_id: BzTrackingId }
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

AppleLogin.getInitialProps = async (ctx) => {
  const { req } = ctx;
  const data = await parse(req);
  const { code, state, id_token: idToken } = data;

  return {
    code,
    state: state ? '/' + state : '/',
    idToken,
  };
};

export default AppleLogin;
