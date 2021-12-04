import axios from "axios"
import { prismaClient } from "../prisma"

interface RepoResponse {
  name: string
  description: string
  stargazers_count: number
  language: string
  html_url: string
  owner: {
    login: string
    html_url: string
  }
}

export class CreateStarredReposService {
  async execute(user_id: string) {
    const user = await prismaClient.user.findFirst({
      where: {
        id: user_id
      }
    })

    const [starred_url] = user.starred_url.split("{")

    const response = await axios.get<RepoResponse[]>(starred_url)

    try {
      response.data.forEach(async starred_repo => {
        let repo = await prismaClient.repo.findFirst({
          where: {
            label: starred_repo.name
          }
        })

        if (!repo) {
          await prismaClient.repo.create({
            data: {
              label: starred_repo.name,
              language: starred_repo.language,
              stars: starred_repo.stargazers_count,
              url: starred_repo.html_url,
              description: starred_repo.description,
              user_id: user_id,
              owner_name: starred_repo.owner.login,
              owner_url: starred_repo.owner.html_url
            }
          })
        }
      })

      return { data: { message: "Created repos successfully." }, code: 200 }
    } catch (error) {
      return { data: { error: error.message }, code: 400 }
    }
  }
}
