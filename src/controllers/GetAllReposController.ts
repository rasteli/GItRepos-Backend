import { Request, Response } from "express"
import { GetAllReposService } from "../services/GetAllReposService"

export class GetAllReposController {
  async handle(request: Request, response: Response) {
    const { user_id } = request

    const service = new GetAllReposService()
    const result = await service.execute(user_id)

    return response.status(result.code).json(result.data)
  }
}
