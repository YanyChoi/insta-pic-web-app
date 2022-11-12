export const storeUserInfo = (userInfo) => {
  try {
    localStorage.setItem("userId", userInfo.userId);
    localStorage.setItem("pw", userInfo.pw);
    localStorage.setItem("name", userInfo.name);
    localStorage.setItem("introduction", userInfo.introduction);
    localStorage.setItem("profilePic", userInfo.profilePic);
    localStorage.setItem("url", userInfo.url);

    return true;
  } catch (e) {
    return false;
  }
};

export const getUserInfo = () => {
  if (localStorage.getItem("userId")) {
    const userInfo = {
      userId: localStorage.getItem("userId"),
      pw: localStorage.getItem("pw"),
      name: localStorage.getItem("name"),
      introduction: localStorage.getItem("introduction"),
      profilePic: localStorage.getItem("profilePic"),
      url: localStorage.getItem("url"),
    };

    return userInfo;
  }

  return null;
};

export const logout = () => {
  localStorage.clear();
  return true;
};
