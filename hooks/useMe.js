import axios from 'axios';
import useSWR from 'swr';

const useMe = () => {
  const { data, error, mutate } = useSWR(
    '/user/me',
    async (action) => {
      return axios
        .get(`${process.env.NEXT_PUBLIC_SERVER_HOST}${action}`, {
          withCredentials: true,
        })
        .then((res) => res.data);
    },
    {
      onErrorRetry: (error) => {},
    }
  );

  //   return { data, error, mutate };
  return { data, error, mutate };
};

export default useMe;
