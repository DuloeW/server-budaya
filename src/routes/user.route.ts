import { Hono } from "hono";
import { getAllUsers } from "../controller/user/user.controller.js";

const userRoute = new Hono()

userRoute.get(`/get-all/users`, async (c: any) => getAllUsers(c))

export default userRoute