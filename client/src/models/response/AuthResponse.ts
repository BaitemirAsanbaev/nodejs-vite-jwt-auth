import { IUser } from "../IUser"

export interface AuthResponse{
  access: string
  refresh: string
  user: IUser 
}