import apiController from 'helpers/apiController';

const { get, post } = apiController();

const receiptApi = () => {
  // 카테고리 목록
  const getCategories = async () => {
    const { data } = await get('/api/receipt/category/list');
    return { data };
  };

  const createCategories = async (name) => {
    await post('/api/receipt/category/create', {
      name: name,
    });
  };

  const deleteCategories = async (categoryId) => {
    await post(`/api/receipt/category/${categoryId}/delete`);
  };

  const changeReceiptCategory = async (receipts, newCategoryId) => {
    await post('api/receipt/change-category', {
      category_id: newCategoryId,
      receipt_list: receipts,
    });
  };

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
    newReceiptInfo.memo && formData.append('memo', newReceiptInfo.memo);
    newReceiptInfo.category &&
      formData.append('category_id', newReceiptInfo.category.id);
    newReceiptInfo.productImage &&
      formData.append('product_image', newReceiptInfo.productImage);
    newReceiptInfo.backgroundImage &&
      formData.append('background_image', newReceiptInfo.backgroundImage);
    newReceiptInfo.imageList.forEach((image) =>
      formData.append('image_list', image)
    );

    await post('/api/receipt/create', formData);
  };

  //영수증 리스트 가져오기
  const getReceipts = async (page = 1, length = 0, categoryId, orderCol, orderDesc) => {
    const { data } = await get('/api/receipt/list', {
      page: page,
      length: length,
      category_id: categoryId,
      order_col: orderCol,
      order_desc: orderDesc
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
    usedDealAlert,
    memo,
    categoryId
  ) => {
    await post(`/api/receipt/${id}/info`, {
      nickname: nickname,
      product_name: productName,
      product_place: productPlace,
      product_price: productPrice,
      product_date: productDate,
      used_deal_alert: usedDealAlert,
      memo: memo,
      category_id: categoryId,
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
      formData.append('image_list', image);
      hasForm = true;
    });
    removeImageIndexList.forEach((idx) => {
      formData.append('remove_image_index_list', idx);
      hasForm = true;
    });

    if (hasForm) {
      await post(`/api/receipt/${id}/images`, formData);
    }
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
    getCategories,
    createCategories,
    deleteCategories,
    changeReceiptCategory,
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
