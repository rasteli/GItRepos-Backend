import { Request, Response } from "express"
import { UpdateTagService } from "../services/UpdateTagService"

export class UpdateTagController {
  async handle(request: Request, response: Response) {
    const { repo_id, type, tag } = request.body

    const service = new UpdateTagService()
    const result = await service.execute(repo_id, type, tag)

    return response.status(result.code).json(result.data)
  }
}
