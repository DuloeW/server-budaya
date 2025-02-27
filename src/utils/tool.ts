import type { JwtVariables } from "hono/jwt";

export const SECREET = 'testing'
export type Variables = JwtVariables;

export const payload = (sub: string, role: string, exp: number) => {
    return {
        sub,
        role,
        exp: Math.floor(Date.now() / 1000) + 60 * exp,
    }
}

