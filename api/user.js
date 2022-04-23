import apiController from 'helpers/apiController';

const { get, post } = apiController();

const userApi = () => {
  //프로필 이미지 수정
  const updateProfileImage = async (image) => {
    const formData = new FormData();
    formData.append('profile_image', image);

    try {
      const { data } = await post(`/api/user/set-profile-image`, formData);

      if (data.profile_image) alert('프로필 사진이 변경되었습니다.');
      else alert('프로필 사진 등록에 실패했습니다.');
    } catch {
      alert('프로필 사진 등록에 실패했습니다.');
    }
  };

  //닉네임 수정
  const updateNickname = async (nickname) => {
    try {
      await post(`/api/user/set-nickname`, {
        nickname: nickname,
      });

      alert('닉네임이 변경되었습니다.');
    } catch {
      alert('닉네임 변경에 실패했습니다.');
    }
  };

  const getUserInfo = async (ctx) => {
    try {
      const { data } = await apiController({ ctx }).get('/api/user/info');
      console.log(data)

      return { logged: true, data: data };
    } catch {
      return { logged: false, data: {} };
    }
  };

  return {
    updateProfileImage,
    updateNickname,
    getUserInfo,
  };
};

export default userApi;
