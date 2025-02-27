import { Hono } from "hono"

import { login, register } from "../controller/auth/auth.controller.js";


const authRoute = new Hono()

//LOGIN
authRoute.post(`/login`, async (c: any) => login(c))

//REGISTER
authRoute.post(`/register`, async (c: any) => register(c))



export default authRoute