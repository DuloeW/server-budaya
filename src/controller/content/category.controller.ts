import { db } from "../../db/connection.js";
import { v4 as uuid } from "uuid";
import { fetchCategory } from "../../utils/tool.js";

export async function getAllCategory(c: any) {
    const [category] = await db.query('SELECT * FROM kategori_budaya')
    return c.json({ category })
}

export async function createACategory(c: any) {
    const {title, description, image_url} = await c.req.json()
    const id = uuid()

    await db.query('INSERT INTO kategori_budaya (id, title, description, image_url) VALUES (?, ?, ?, ?)', [id, title, description, image_url])

    return c.json({ 
        message: 'Content created',
        data: {
            title,
            description,
            image_url
        }
    })

}

export async function deleteACategory(c: any) {
    const {id} = await c.req.json()

    const listCategory = await fetchCategory(id)
    const category = listCategory[0]
    
    if(!category) {
        return c.json({ message: 'Content not found' })
    }

    await db.query('DELETE FROM kategori_budaya WHERE id = ?', [id])
    return c.json({ message: 'Content deleted' })
}

export async function updateACategory(c: any) {
    const {id, title, description, image_url} = await c.req.json()

    const listCategory = await fetchCategory(id)
    const category = listCategory[0]

    if(!category) {
        return c.json({ message: 'Content not found' })
    }

    await db.query('UPDATE kategori_budaya SET title = ?, description = ?, image_url = ? WHERE id = ?', [title, description, image_url, id])
    return c.json({ message: 'Content updated' })
}