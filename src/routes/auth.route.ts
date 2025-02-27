import { Hono } from "hono"
import { HTTPException } from "hono/http-exception"
import { sign } from 'hono/jwt';
import { expiredIn, payload } from "../utils/tool.js";
import { setCookie } from "hono/cookie";
import bcrypt from "bcryptjs";
import { db } from "../db/connection.js";
import {v4 as uuid} from 'uuid'


const authRoute = new Hono()

//LOGIN
authRoute.post(`/login`, async (c: any) => {
    const {username, password} = await c.req.json()
     
    const secreet = process.env.SECREET_KEY!

    if(username !== 'admin' || password !== 'admin') {
        throw new HTTPException(401, { message: 'Invalid username or password' })
    } 
    const token = await sign(payload(username, expiredIn), secreet)
    setCookie(c, 'token', token)
    return c.json({ token })
})

//REGISTER
authRoute.post(`/register`, async (c: any) => {
    const {username, password} = await c.req.json()

    const id = uuid()
    const hashed = await bcrypt.hash(password, 10)
    await db.query('INSERT INTO users (id, username, password) VALUES (?, ?, ?)', [id, username, hashed])
    return c.json({ message: 'User created' })
})

export default authRoute