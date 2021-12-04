import { Request, Response } from "express"
import { GetReposByTagService } from "../services/GetReposByTagService"

export class GetReposByTagController {
  async handle(request: Request, response: Response) {
    const { user_id } = request
    const { tag } = request.body

    const service = new GetReposByTagService()
    const result = await service.execute(user_id, tag)

    return response.status(result.code).json(result.data)
  }
}
