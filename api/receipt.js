import apiController from 'helpers/apiController';

const { get, post } = apiController();

const receiptApi = () => {
  //영수증 등록
  const createReceipt = async (nickname, image) => {
    const formData = new FormData();
    formData.append('nickname', nickname);
    formData.append('image_list', image);

    post('/api/receipt/create', formData);
  };

  //영수증 리스트 가져오기
  const getReceipts = async (page = 1, length = 100) => {
    const { data } = await get('/api/receipt/list', {
      page: page,
      length: length,
    });

    return { data };
  };

  //영수증 상세 정보 가져오기
  const getReceiptDetail = async (id) => {
    const { data } = await get(`/api/receipt/${id}/info`);

    return { data };
  };

  const changeReceiptNickname = async (id, nickname) => {
    const { data } = await post(`/api/receipt/${id}/set-nickname`, {
      nickname: nickname,
    });
    return { data };
  };

  //영수증 등록
  const updateProductImage = async (id, image) => {
    const formData = new FormData();
    formData.append('image', image);

    post(`/api/receipt/${id}/upload-product-image`, formData);
  };

  //영수증 삭제
  const deleteReceipt = async (id, reason) => {
    post(`/api/receipt/${id}/delete`, { reason: reason });
  };

  return {
    createReceipt,
    getReceipts,
    getReceiptDetail,
    changeReceiptNickname,
    updateProductImage,
    deleteReceipt,
  };
};

export default receiptApi;
