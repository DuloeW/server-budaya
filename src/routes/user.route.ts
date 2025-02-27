import { Hono } from "hono";
import { db } from "../db/connection.js";

const userRoute = new Hono()

userRoute.get(`/get-all/users`, async (c: any) => {
    const [data] = await db.query('SELECT * FROM users')
    return c.json({ data })
})

export default userRoute