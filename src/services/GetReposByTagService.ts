import { prismaClient } from "../prisma"

export class GetReposByTagService {
  async execute(user_id: string, tag: string) {
    const repos = await prismaClient.repo.findMany({
      where: {
        user_id,
        tags: {
          has: tag
        }
      },
      orderBy: {
        label: "asc"
      }
    })

    return { data: { repos }, code: 200 }
  }
}
