import axios from "axios"
import { sign } from "jsonwebtoken"
import { prismaClient } from "../prisma"

interface TokenAuthResponse {
  access_token: string
}

interface UserAuthResponse {
  login: string
  avatar_url: string
  starred_url: string
}

export class AuthenticateUserService {
  async execute(code: string) {
    const tokenUrl = "https://github.com/login/oauth/access_token"
    const userUrl = "https://api.github.com/user"

    const { data: tokenResponse } = await axios.post<TokenAuthResponse>(
      tokenUrl,
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code
      },
      {
        headers: {
          Accept: "application/json"
        }
      }
    )

    const { data: userResponse } = await axios.get<UserAuthResponse>(userUrl, {
      headers: {
        Authorization: `token ${tokenResponse.access_token}`
      }
    })

    let user = await prismaClient.user.findFirst({
      where: {
        name: userResponse.login
      }
    })

    if (!user) {
      user = await prismaClient.user.create({
        data: {
          name: userResponse.login,
          avatar_url: userResponse.avatar_url,
          starred_url: userResponse.starred_url
        }
      })

      const token = sign({ user: user.id }, process.env.JWT_SECRET_KEY, {
        subject: user.id,
        expiresIn: "1d"
      })

      return { data: { user, token }, code: 200 }
    }

    return { data: { error: "User already exists." }, code: 401 }
  }
}
