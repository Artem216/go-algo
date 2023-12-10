import axios from "axios";
import { API_URL } from "../config";
import { IAccessToken } from "./models/IAccessToken";
import { ILoginData } from "./models/ILoginData";
import { ISignUpData } from "./models/ISignUpData";

class AuthApiService {
  public async getAccessToken(data: ILoginData): Promise<IAccessToken | null> {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("password", data.password);

    const response = await axios.post<IAccessToken>(
      API_URL + "/login",
      formData
    );

    console.log(response.data);

    if (response.status == 200) {
      localStorage.setItem("token", response.data.access_token);
    }

    return response.data;
  }
  public async createUser(data: ISignUpData): Promise<IAccessToken> {
    const response = await axios.post<IAccessToken>(API_URL + "/signup", data);

    localStorage.setItem("token", response.data.access_token);

    return response.data;
  }

  public async loggedIn(): Promise<boolean> {
    const response = await axios.get(API_URL + "/users/me");
    return response.status === 200;
  }
}

export const AuthApiServiceInstance = new AuthApiService();
