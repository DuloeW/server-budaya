import { Hono } from 'hono'
import { prettyJSON } from 'hono/pretty-json'
import { addData, getAllData } from '../controller/controller.js'
import { expiredIn, payload, type Variables } from '../utils/tool.js'
import { jwt } from 'hono/jwt';
import { sign } from 'hono/jwt';
import { logger } from 'hono/logger';
import { basicAuth } from 'hono/basic-auth';
import { use } from 'hono/jsx';
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { HTTPException } from 'hono/http-exception';
import { setCookie } from 'hono/cookie';

const app = new Hono<{Variables: Variables}>

app.use(prettyJSON())
app.use(logger())

const BASE_URL = '/api'
const BASE_URL_AUTH = '/api/auth'
const TOKEN = process.env.TOKEN!

//MIDDLEWARE
app.use(`${BASE_URL_AUTH}/*`, 
    jwt({
        secret: "akakak"
    })
)

app.get(`${BASE_URL_AUTH}/`, (c: any) => getAllData(c))

app.post(`${BASE_URL_AUTH}/cuki/add`, (c: any) => addData(c))

app.get(`${BASE_URL_AUTH}/products`, (c: any) => {
    return c.json({ message: 'List message!' })
})


// DONT USE MIDDLERWARE
app.post(`${BASE_URL}/login`, async (c: any) => {
    const {username, password} = await c.req.json()
     
    const secreet = process.env.JWT_SECRET_KEY!

    if(username !== 'admin' || password !== 'admin') {
        throw new HTTPException(401, { message: 'Invalid username or password' })
    } 
    const token = await sign(payload(username, expiredIn), secreet || 'kontol')
    setCookie(c, 'token', token)
    return c.json({ token })
})

export default app