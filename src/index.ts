import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import userRoute from './routes/route.js'

const app = new Hono()

app.route('/', userRoute)

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
