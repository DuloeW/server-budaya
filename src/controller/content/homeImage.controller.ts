import { db } from "../../db/connection.js";
import { v4 as uuid } from "uuid";
import { fetchAHomeImage } from "../../utils/tool.js";
import type { Context } from "hono";


export async function getAllHomeImages(c: Context) {
    const [homeImages] = await db.query('SELECT * FROM home_images')
    return c.json({ homeImages })
}

export async function createAHomeImage(c: Context) {
    const {title, image_url} = await c.req.json()

    const id = uuid()

    await db.query('INSERT INTO home_images (id, title, image_url) VALUES (?, ?, ?)', [id, title, image_url])
    return c.json({message: 'Content created'})
}

export async function deleteAHomeImage(c: Context) {
    const {id} = await c.req.json()

    const listHomeImage = await fetchAHomeImage(id)
    const homeImage = listHomeImage[0]

    if(!homeImage) {
        return c.json({ message: 'Content not found' })
    }

    await db.query('DELETE FROM home_images WHERE id = ?', [id])
    return c.json({ message: 'Content deleted' })
}

export async function updateAHomeImage(c: Context) {
    const {id, title, image_url} = await c.req.json()

    const listHomeImage = await fetchAHomeImage(id)
    const homeImage = listHomeImage[0]

    if(!homeImage) {
        return c.json({ message: 'Content not found' })
    }

    await db.query('UPDATE home_images SET title = ?, image_url = ? WHERE id = ?', [title, image_url, id])
    return c.json({ message: 'Content updated' })
}