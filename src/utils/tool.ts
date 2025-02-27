import type { JwtVariables } from "hono/jwt";
import { db } from "../db/connection.js";
import type { RowDataPacket } from "mysql2";

export const SECREET = 'testing'
export type Variables = JwtVariables;

export const expiredIn = Math.floor(Date.now() / 1000) + (86400 * 7);

export const payload = (name: string, exp: number) => {
    return {
        name,
        exp
    }
}

export async function fetchUser(username: string) {
    const [rows] = await db.query<RowDataPacket[]>('SELECT * FROM USERS WHERE username = ?', [username])
    return rows
}

export async function fetchSummary(id: string) {
    const [rows] = await db.query<RowDataPacket[]>('SELECT * FROM summary_chat_bubble WHERE id = ?', [id])
    return rows
}

export async function fetchCategory(id: string) {
    const [rows] = await db.query<RowDataPacket[]>('SELECT * FROM kategori_budaya WHERE id = ?', [id])
    return rows
}
