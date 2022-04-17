import apiController from 'helpers/apiController';

const { get, post } = apiController();

const userApi = () => {
  //프로필 이미지 수정
  const updateProfileImage = async (image) => {
    const formData = new FormData();
    formData.append('image', image);

    try {
      await post(`/api/user/set-profile-image`, formData);

      alert('프로필 사진이 변경되었습니다.');
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

  return {
    updateProfileImage,
    updateNickname,
  };
};

export default userApi;
