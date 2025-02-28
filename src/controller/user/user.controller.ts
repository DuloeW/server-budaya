import type { Context } from "hono"
import { db } from "../../db/connection.js"

export async function getAllUsers(c: Context) {
    const [data] = await db.query('SELECT * FROM users')
    return c.json({ 
        message: 'Get all users success',
        data
     })
}