import apiController from 'helpers/apiController';

const { get, post } = apiController();

const receiptApi = () => {
  //영수증 등록
  const createReceipt = (nickname, image) => {
    const formData = new FormData();
    formData.append('nickname', nickname);
    formData.append('image_list', image);

    post('/api/receipt/create', formData);
  };

  //영수증 리스트 가져오기
  const getReceipts = async (page = 1, length = 10) => {
    const { data } = await get('/api/receipt/list', {
      page: page,
      length: length,
    });

    return { data };
  };

  return { createReceipt, getReceipts };
};

export default receiptApi;
