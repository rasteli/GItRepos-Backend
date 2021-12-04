import { prismaClient } from "../prisma"

export class UpdateTagService {
  async execute(repo_id: string, type: "add" | "remove", tag?: string) {
    const repo = await prismaClient.repo.findFirst({
      where: {
        id: repo_id
      }
    })

    if (repo) {
      const operations = {
        add: () => {
          repo.tags.push(tag)
          return repo.tags
        },
        remove: () => {
          return repo.tags.filter(repo_tag => {
            return tag !== repo_tag
          })
        }
      }

      const getTags = operations[type]

      await prismaClient.repo.update({
        where: {
          id: repo_id
        },
        data: {
          tags: getTags()
        }
      })
    }

    return { data: { message: "Success" }, code: 200 }
  }
}
