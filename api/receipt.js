import apiController from 'helpers/apiController';

const { get, post } = apiController();

const receiptApi = () => {
  //영수증 등록
  const createReceipt = async (newReceiptInfo) => {
    const formData = new FormData();

    // productName만 필수 입력
    formData.append('product_name', newReceiptInfo.productName);

    newReceiptInfo.nickname &&
      formData.append('nickname', newReceiptInfo.nickname);
    newReceiptInfo.productPlace &&
      formData.append('product_place', newReceiptInfo.productPlace);
    newReceiptInfo.productPrice &&
      formData.append('product_price', newReceiptInfo.productPrice);
    newReceiptInfo.productDate &&
      formData.append('product_date', newReceiptInfo.productDate);
    newReceiptInfo.usedDealAlert &&
      formData.append('used_deal_alert', newReceiptInfo.usedDealAlert);
    newReceiptInfo.productImage &&
      formData.append('product_image', newReceiptInfo.productImage);
    newReceiptInfo.backgroundImage &&
      formData.append('background_image', newReceiptInfo.backgroundImage);
    newReceiptInfo.imageList.forEach((image) =>
      form.append('image_list', image)
    );

    await post('/api/receipt/create', formData);
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

  const changeReceiptInfo = async (
    id,
    nickname,
    productName,
    productPlace,
    productPrice,
    productDate,
    usedDealAlert
  ) => {
    await post(`/api/receipt/${id}/info`, {
      nickname: nickname,
      product_name: productName,
      product_place: productPlace,
      product_price: productPrice,
      product_date: productDate,
      used_deal_alert: usedDealAlert,
    });
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

    await post(`/api/receipt/${id}/upload-product-image`, formData);
  };

  //영수증 삭제
  const deleteReceipt = async (id, reason) => {
    await post(`/api/receipt/${id}/delete`, { reason: reason });
  };

  return {
    createReceipt,
    getReceipts,
    getReceiptDetail,
    changeReceiptInfo,
    changeReceiptNickname,
    updateProductImage,
    deleteReceipt,
  };
};

export default receiptApi;
