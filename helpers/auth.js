import _ from 'lodash';
import axios from 'axios';

import { getCookie, removeCookie, setCookie } from 'helpers/cookie';
import { redirect } from 'helpers/utils';

const kickout = (ctx) => {
  removeCookie('accessToken', ctx);
  removeCookie('refreshtoken', ctx);
  redirect('/login', ctx);
};

export function setAuthInterceptors(instance, ctx) {
  instance.interceptors.request.use(
    (config) => {
      // 요청할 때만 token 적재
      config.headers.Authorization = `Bearer ${getCookie('accessToken', ctx)}`;
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );

  // Add a response interceptor
  instance.interceptors.response.use(
    (response) => {
      return Promise.resolve(response);
    },
    async (error) => {
      if (!error.response) {
        console.error('network error', error);
        return Promise.reject(error);
      }

      const { status } = error.response;
      if (404 === status) {
        kickout(ctx);
        return Promise.reject(error);
      }

      // 401 권한에러가 발생하였는데, url 자체가 refresh 가 아닌 경우면
      // refreshToken 으로 accessToken을 재발급 받는다.
      if (401 === status) {
        if (!_.includes(error.config.url, '/api/auth/refresh')) {
          const { data: refreshData } = await axios.post(
            '/api/auth/refresh',
            null,
            {
              headers: {
                Authorization: `Bearer ${getCookie('refreshToken', ctx)}`,
              },
            }
          );

          const accessToken = refreshData.accessToken;
          setCookie('accessToken', accessToken, ctx);
          error.config.headers.Authorization = `Bearer ${accessToken}`;
          return axios(error.config);
        } else {
          return kickout(ctx);
        }
      }
      return Promise.reject(error);
    }
  );
  return instance;
}
