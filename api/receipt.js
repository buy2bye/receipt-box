import apiController from 'helpers/apiController';

const { get, post } = apiController();

const receiptApi = () => {
  //영수증 등록
  const createReceipt = async (receiptInfo, receiptImageInfo) => {
    const formData = new FormData();
    formData.append('nickname', receiptInfo.nickname);
    formData.append('product_name', receiptInfo.productName);
    formData.append('product_place', receiptInfo.productPlace);
    formData.append('product_price', receiptInfo.productPrice);
    formData.append('product_date', receiptInfo.productDate);
    formData.append('used_deal_alert', receiptInfo.usedDealAlert);
    formData.append('product_image', receiptImageInfo.productImage);
    formData.append('background_image', receiptImageInfo.backgroundImage);
    // receiptImageInfo.imageList for문 돌면서 append
    // formData.append('image_list', receiptImageInfo.imageList);

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

  const changeReceiptImages = async (
    id,
    productImage,
    backgroundImage,
    imageList,
    removeImageIndexList
  ) => {
    const formData = new FormData();
    let hasForm = false;
    if (productImage) {
      formData.append('product_image', productImage);
      hasForm = true;
    }
    if (backgroundImage) {
      formData.append('background_image', backgroundImage);
      hasForm = true;
    }
    imageList.forEach((image) => {
      formData.append('image_list', image)
      hasForm = true;
    });
    removeImageIndexList.forEach((idx) => {
      formData.append('remove_image_index_list', idx)
      hasForm = true;
    });

    if (hasForm) {
      await post(`/api/receipt/${id}/images`, formData);
    }
  }

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
    changeReceiptImages,
    changeReceiptNickname,
    updateProductImage,
    deleteReceipt,
  };
};

export default receiptApi;
