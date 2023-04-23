export const storeUserInfo = (loginInfo) => {
  try {
    localStorage.setItem("accessToken", loginInfo.accessToken);
    localStorage.setItem("refreshToken", loginInfo.refreshToken);
    return true;
  } catch (e) {
    return false;
  }
};

export const logout = () => {
  localStorage.clear();
  return true;
};
