import { db } from "../../db/connection.js";
import { v4 as uuid } from "uuid";
import { fetchCategory } from "../../utils/tool.js";
import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";

export async function getAllCategory(c: Context) {
    const [category] = await db.query('SELECT * FROM kategori_budaya')
    return c.json({
        message: 'Get all category success',
        data: category
    })
}

export async function createACategory(c: Context) {
    const { title, description, image_url } = await c.req.json()
    const id = uuid()

    await db.query('INSERT INTO kategori_budaya (id, title, description, image_url) VALUES (?, ?, ?, ?)', [id, title, description, image_url])

    return c.json({
        message: 'Create category success',
        data: {
            id,
            title,
            description,
            image_url
        }
    })

}

export async function deleteACategory(c: Context) {
    const { id } = await c.req.json()

    const listCategory = await fetchCategory(id)
    const category = listCategory[0]

    if (!category) {
        return c.json({ message: 'Content not found' })
    }

    await db.query('DELETE FROM kategori_budaya WHERE id = ?', [id])
    return c.json({
        message: 'Delete category success',
        data: category
    })
}

export async function updateACategory(c: Context) {
    const { id, title, description, image_url } = await c.req.json()

    const listCategory = await fetchCategory(id)
    const category = listCategory[0]

    if (!category) {
        throw new HTTPException(404, { message: 'Content not found' })
    }

    await db.query('UPDATE kategori_budaya SET title = ?, description = ?, image_url = ? WHERE id = ?', [title, description, image_url, id])
    return c.json({
        message: 'Update category success',
        data: {
            id,
            title,
            description,
            image_url
        }
    })
}