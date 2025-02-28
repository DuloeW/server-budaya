import { db } from "../../db/connection.js";
import { v4 as uuid } from "uuid";
import { fetchSummary } from "../../utils/tool.js";
import { convertSummaryType } from "../../utils/enum/summary.enum.js";

export async function getAllSummary(c: Context) {
    const [summary_chat]: any = await db.query('SELECT * FROM summary_chat_bubble')
    for(let summary of summary_chat) {
        summary.type = convertSummaryType(summary.type)

    }
    return c.json({ summary_chat })
}

export async function createSummary(c: Context) {
    const {type, description} = await c.req.json()
    const id = uuid()
    
    await db.query('INSERT INTO summary_chat_bubble (id, type, description) VALUES (?, ?, ?)', [id, type, description])
    return c.json({ message: 'Content created',})
}

export async function deleteSummary(c: Context) {
    const {id} = await c.req.json()

    const allSummary = await fetchSummary(id)
    const summary = allSummary[0];

    if(!summary) {
        return c.json({ message: 'Content not found' })
    }

    await db.query('DELETE FROM summary_chat_bubble where id = ?', [id])
    return c.json({ message: 'Content deleted' })
}

export async function updateSummary(c: Context) {
    const {id, type, description} = await c.req.json()

    const allSummary = await fetchSummary(id)
    const summary = allSummary[0];

    if(!summary) {
        return c.json({ message: 'Content not found' })
    }

    await db.query('UPDATE summary_chat_bubble SET type = ?, description = ? WHERE id = ?', [type, description, id])
    return c.json({ message: 'Content updated' })
}