import { Hono, type Context } from "hono"

import { login, register } from "../controller/auth/auth.controller.js";


const authRoute = new Hono()

//LOGIN
authRoute.post(`/login`, async (c: Context) => login(c))

//REGISTER
authRoute.post(`/register`, async (c: Context) => register(c))



export default authRoute