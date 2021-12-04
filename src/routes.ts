import { Router } from "express"

import { ensureAuthenticated } from "./Middlewares/ensureAuthenticated"
import { UpdateTagController } from "./controllers/UpdateTagController"
import { GetAllReposController } from "./controllers/GetAllReposController"
import { GetReposByTagController } from "./controllers/GetReposByTagController"
import { AuthenticateUserController } from "./controllers/AuthenticateUserController"
import { CreateStarredReposController } from "./controllers/CreateStarredReposController"

const routes = Router()

routes.post("/signup", new AuthenticateUserController().handle)
routes.put("/repos", ensureAuthenticated, new UpdateTagController().handle)

routes.get(
  "/all-repos",
  ensureAuthenticated,
  new GetAllReposController().handle
)

routes.post(
  "/repos-by-tag",
  ensureAuthenticated,
  new GetReposByTagController().handle
)

routes.post(
  "/repos",
  ensureAuthenticated,
  new CreateStarredReposController().handle
)

export { routes }
