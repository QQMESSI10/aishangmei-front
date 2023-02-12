export function setToken(token) {
  // 50400
  return window.localStorage.setItem("token", token);
}

export function getToken() {
  return window.localStorage.getItem("token");
}

export function removeToken() {
  return window.localStorage.removeItem("token");
}

export function checkToken() {
  const oldToken = window.localStorage.getItem("token");
  if (oldToken) {
    const nowDate = String(new Date().getTime());
    const oldDate = oldToken.slice(-13);
    if (Number(nowDate) - Number(oldDate) > 10800000) {
      removeToken();
      return false;
    } else {
      const tokenTop = oldToken.slice(0, oldToken.length - 13);
      setToken(tokenTop + nowDate);
      return true;
    }
  } else {
    return false;
  }
}
