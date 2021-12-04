import { prismaClient } from "../prisma"

export class GetAllReposService {
  async execute(user_id: string) {
    const repos = await prismaClient.repo.findMany({
      where: {
        user_id
      },
      orderBy: {
        label: "asc"
      }
    })

    return { data: { repos }, code: 200 }
  }
}
