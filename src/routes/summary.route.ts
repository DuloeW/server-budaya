import { Hono } from "hono";
import { createSummary, deleteSummary, getAllSummary, updateSummary } from "../controller/content/summary.controller.js";

const summaryRoute = new Hono()

summaryRoute.get('/get-all/summary', async (c) => getAllSummary(c))
summaryRoute.post('/create/summary', async (c) => createSummary(c))
summaryRoute.delete('/delete/summary', async (c) => deleteSummary(c))
summaryRoute.put('/update/summary', async (c) => updateSummary(c))

export default summaryRoute