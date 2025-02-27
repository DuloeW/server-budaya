import type { JwtVariables } from "hono/jwt";

export const SECREET = 'testing'
export type Variables = JwtVariables;

export const expiredIn = Math.floor(Date.now() / 1000) + (86400 * 7);

export const payload = (name: string, exp: number) => {
    return {
        name,
        exp
    }
}