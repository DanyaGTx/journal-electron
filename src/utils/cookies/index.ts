import Cookies from "js-cookie";

export const getCookie = (cookieName: string) => {
  return Cookies.get(cookieName);
};
export const setCookie = (name: string, value: string, days: number): void => {
  Cookies.set(name, value, { expires: days });
};

export const removeCookie = (name: string) => {
  Cookies.remove(name);
};
