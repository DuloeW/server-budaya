import { HTTPException } from "hono/http-exception"
import { sign } from 'hono/jwt';
import { expiredIn, fetchUser, payload } from "../../utils/tool.js";
import { setCookie } from "hono/cookie";
import bcrypt from "bcryptjs";
import { db } from "../../db/connection.js";
import {v4 as uuid} from 'uuid'

export async function login(c: any) {
    const {username, password} = await c.req.json()
     
    const secreet = process.env.SECREET_KEY!

    const users = await fetchUser(username)
    const user = users[0]
    const match = await bcrypt.compare(password, user.password)

    if(!user) {
        throw new HTTPException(401, { message: 'Invalid username or password' })
    }

    if(!match) {
        throw new HTTPException(401, { message: 'Invalid username or password' })
    }

    const token = await sign(payload(username, expiredIn), secreet)
    setCookie(c, 'token', token)
    return c.json({
        message: 'Login success',
        data: {
            token
        }
    })
}

export async function register(c: any) {
    const {username, password} = await c.req.json()

    const users = await fetchUser(username)
    const user = users[0]

    if(user) {
        throw new HTTPException(400, { message: 'User already'})
    }

    const id = uuid()
    const hashed = await bcrypt.hash(password, 10)
    await db.query('INSERT INTO users (id, username, password) VALUES (?, ?, ?)', [id, username, hashed])
    return c.json({
        message: 'Register success',
        data: {
            username
        }
    })
}