import { User } from "./models"

export type SuccessfulLoginResponse = {
  token: string
  user: User
}
