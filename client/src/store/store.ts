import { makeAutoObservable } from "mobx";
import { IUser } from "../models/IUser";
import AuthService from "../services/AuthService";
import axios from 'axios'
import { API_URL } from "../http";
import { AuthResponse } from "../models/response/AuthResponse";

export default class Store {
  user = {} as IUser
  isAuthed = false
  isLoading = false

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean) {
    this.isAuthed = bool
  }

  setUser(user: IUser) {
    this.user = user
  }
  setLoading(bool:boolean){
    this.isLoading = bool
  }

  async login(email: string, password: string) {
    try {
      const response = await AuthService.login(email, password);
      localStorage.setItem("token", response.data.access);
      this.setAuth(true)
      this.setUser(response.data.user)
      console.log(response)
    } catch (e: any) {
      console.log(e.response?.data?.message)
    }
  }
  async registration(email: string, password: string) {
    try {
      const response = await AuthService.registration(email, password)
      localStorage.setItem("token", response.data.access)
      this.setAuth(true)
      this.setUser(response.data.user)
      console.log(response)
    } catch (e: any) {
      console.log(e.response?.data?.message)
    }
  }
  async logout() {
    try {
      await AuthService.logout()
      localStorage.removeItem("token")
      this.setAuth(false)
      this.setUser({} as IUser)
    } catch (e: any) {
      console.log(e.response?.data?.message)
    }
  }
  async checkAuth(){
    try{
      this.setLoading(true)
      const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials:true})
      localStorage.setItem("token", response.data.access);
      this.setAuth(true);
      this.setUser(response.data.user);
      console.log(response); 
      
    } catch (e: any) {
      console.log(e.response?.data?.message);
    }
    finally{
      this.setLoading(false)
    }

  }
}
