export function getAllData(c: any) {
    return c.json({ message: 'Hello, World!' })
}

export async function addData(c: any) {
    const body = await c.req.json()
    const data = { ...body }
    return c.json(data?.data)
}