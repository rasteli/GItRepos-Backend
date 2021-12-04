import { Request, Response } from "express"
import { CreateStarredReposService } from "../services/CreateStarredReposService"

export class CreateStarredReposController {
  async handle(request: Request, response: Response) {
    const { user_id } = request

    const service = new CreateStarredReposService()
    const result = await service.execute(user_id)

    return response.status(result.code).json(result.data)
  }
}
