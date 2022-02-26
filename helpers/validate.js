export const isKoreanName = /^[가-힣]{2,30}$/;
export const isEnglishName = /^[a-z|A-Z|\s]{3,40}$/;
export const isNumber = /^[0-9]{0,11}$/;
export const isEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
export const isBirth =
  /^(19[0-9][0-9]|20\d{2})(0[1-9]|1[0-2])(0[1-9]|[1,2][0-9]|3[0,1])$/;
export const isPhone = /^01([0|1|6|7|8|9]{1})-?([0-9]{3,4})-?([0-9]{4})$/;
