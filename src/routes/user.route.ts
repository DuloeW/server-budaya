import { Hono, type Context } from "hono";
import { getAllUsers } from "../controller/user/user.controller.js";

const userRoute = new Hono()

userRoute.get(`/get-all/users`, async (c: Context) => getAllUsers(c))

export default userRoute