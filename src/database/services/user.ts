import { client } from "../index";
import { Account } from "appwrite";
import { IUserInfo, IUserLoginInfo } from "@/types/user";
import { useUserStore } from "@/stores/user";

const account = new Account(client);

export const createUserApi = async (userInfo: IUserInfo) => {
  return await account.create(userInfo.userId, userInfo.email, userInfo.password, userInfo.name);
};

export const getUserApi = async () => {
  return await account.get();
};

export const loginUserApi = async (userLoginInfo: IUserLoginInfo) => {
  return await account.createEmailPasswordSession(userLoginInfo.email, userLoginInfo.password);
};

export const logoutUserApi = async () => {
  return await account.deleteSession("current");
};
