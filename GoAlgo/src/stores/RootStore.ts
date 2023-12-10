import { makeAutoObservable, observable } from "mobx";
import { IUser } from "../api/models/IUser";

export class RootStore {
  // тут логин хранить?? или только токен???
  public user: IUser | null = null;

  constructor() {
    makeAutoObservable(this, {
      user: observable,
    });
  }

  public setUser(user: IUser) {
    this.user = user;
  }
}

export const rootStore = new RootStore();
