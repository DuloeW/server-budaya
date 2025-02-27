import { Hono } from 'hono'
import { prettyJSON } from 'hono/pretty-json'
import { addData, getAllData } from '../controller/controller.js'
import { payload, type Variables } from '../utils/tool.js'
import { jwt } from 'hono/jwt';
import { sign } from 'hono/jwt';

const app = new Hono<{Variables: Variables}>

app.use(prettyJSON())


app.use(
    '/auth/*',
    jwt({
        secret: 'secret',
    })
)

app.get('/auth/page', (c) => {
    const payload = c.get('jwtPayload')
    return c.json({ message: 'Hello, World!', payload })
})


app.get('/login', (c) => {
    const token = payload('admin', 'admin', 60)
    return c.json(token)
})




app.get('/', (c) => getAllData(c))

app.post('/cuki/add', (c) => addData(c))

export default app