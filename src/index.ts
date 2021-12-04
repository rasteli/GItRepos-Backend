import "dotenv/config"

import express from "express"
import { routes } from "./routes"

const app = express()
const PORT = process.env.PORT || 3333

app.use(express.json())
app.use(routes)

app.get("/github", (request, response) => {
  return response.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
  )
})

app.get("/callback", (request, response) => {
  const { code } = request.query

  return response.json({ code })
})

app.listen(PORT, () => console.log(`🚀 Server listening on port ${PORT}`))
