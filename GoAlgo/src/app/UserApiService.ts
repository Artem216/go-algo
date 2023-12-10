import axios, { AxiosError } from "axios";
import { API_URL } from "../config";
import { IUser } from "./models/IUser.ts";
import authHeader from "../utils/authHeaders.ts";
import { IStocksNames } from "./models/IStocksNames.ts";

class UserApiService {
  public async getUserData(): Promise<IUser | undefined> {
    try {
      const response = await axios.get<IUser>(API_URL + "/api/v1/users/me", {
        headers: authHeader(),
      });

      console.log(response.data);

      return response.data;
    } catch (error: AxiosError | any) {
      console.log(error);

      if (error.response.status === 401) {
        console.log(error);
        console.log(error.response.status);
        return undefined;
      }
    }
  }

  public async getAllStocks(): Promise<IStocksNames | undefined> {
    try {
      const response = await axios.get<IStocksNames>(
        API_URL + "/api/v1/trader/instrument_all",
        {
          headers: authHeader(),
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error: AxiosError | any) {
      console.log(error);

      if (error.response.status === 404) {
        console.log(error);
        console.log(error.response.status);
        return undefined;
      }
    }
  }
}

export const UserApiServiceInstance = new UserApiService();
