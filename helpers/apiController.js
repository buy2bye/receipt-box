import axios from 'axios';
import _ from 'lodash';

import { setAuthInterceptors } from 'helpers/auth';

const apiController = (props = {}) => {
  const { isAuth = true, ctx = null } = props;
  // axios.defaults.headers.post.Accept = 'application/json';
  // axios.defaults.headers.post['Content-Type'] = 'application/json';
  axios.defaults.headers.post.Accept = 'multipart/form-data';
  axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
  axios.defaults.headers.delete.Accept = 'application/json';
  axios.defaults.headers.delete['Content-Type'] = 'application/json';
  axios.defaults.timeout = 10000;
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_HOST;

  const api = isAuth ? setAuthInterceptors(axios.create(), ctx) : axios;

  const get = async (url, payload) => {
    try {
      let res;
      if (payload) {
        res = await api.get(url, {
          params: payload,
        });
      } else {
        res = await api.get(url);
      }

      return res;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  // apis: [ { url: PropTypes.string, payload: PropTypes.object }]
  const getAll = async (apis = []) => {
    const responses = await Promise.all(
      _.map(apis, ({ url, payload }) => get(url, payload))
    );
    return responses;
  };

  const post = async (url, payload) => {
    try {
      const res = await api.post(url, payload);
      return res;
    } catch (err) {
      throw err;
    }
  };

  const patch = async (url, payload) => {
    try {
      const res = await api.patch(url, payload);
      return res;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const del = async (url, payload) => {
    try {
      const res = await api.delete(
        url,
        { data: payload },
        {
          withCredentials: true, // 크로스 사이트 접근 제어(cross-site Access-Control) 요청이 필요한 경우 설정
        }
      );
      return res;
    } catch (err) {
      throw err;
    }
  };

  return {
    get,
    post,
    getAll,
    del,
    patch,
  };
};

export default apiController;
