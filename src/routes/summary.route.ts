import { Hono, type Context } from "hono";
import { createSummary, deleteSummary, getAllSummary, updateSummary } from "../controller/content/summary.controller.js";

const summaryRoute = new Hono()

summaryRoute.get('/get-all/summary', async (c: Context) => getAllSummary(c))
summaryRoute.post('/create/summary', async (c: Context) => createSummary(c))
summaryRoute.delete('/delete/summary', async (c: Context) => deleteSummary(c))
summaryRoute.put('/update/summary', async (c: Context) => updateSummary(c))

export default summaryRoute