import { Hono, type Context } from "hono";
import { createACategory, deleteACategory, getAllCategory, updateACategory } from "../controller/content/category.controller.js";

const categoryRoute = new Hono()

categoryRoute.get('/get-all/category', async (c: Context) => getAllCategory(c))
categoryRoute.post('/create/category', async (c: Context) => createACategory(c))
categoryRoute.delete('/delete/category', async (c: Context) => deleteACategory(c))
categoryRoute.put('/update/category', async (c: Context) => updateACategory(c))

export default categoryRoute