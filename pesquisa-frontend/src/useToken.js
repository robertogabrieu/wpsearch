import { useState } from 'react';

export default function useToken() {
  function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  const getToken = () => {
    const tokenString = getCookie('token');
    return tokenString
  };

  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
    setCookie("token", userToken, 1)
    setToken(userToken.token);
  };

  return {
    setToken: saveToken,
    token
  }
}