import { Hono } from "hono";
import { createACategory, deleteACategory, getAllCategory, updateACategory } from "../controller/content/category.controller.js";

const categoryRoute = new Hono()

categoryRoute.get('/get-all/category', async (c) => getAllCategory(c))
categoryRoute.post('/create/category', async (c) => createACategory(c))
categoryRoute.delete('/delete/category', async (c) => deleteACategory(c))
categoryRoute.put('/update/category', async (c) => updateACategory(c))

export default categoryRoute