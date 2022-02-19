import apiController from 'helpers/apiController';

const receiptApi = () => {
  const create = (nickname, image) => {
    const formData = new FormData();
    formData.append('nickname', nickname);
    formData.append('image_list', image);

    const { post } = apiController();
    post('/api/receipt/create', formData);
  };

  return { create };
};

export default receiptApi;
