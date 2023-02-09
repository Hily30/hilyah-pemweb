import { getUst, postUst } from "./ust"

export default function handler(req, res) {
    try {
        const method = req.method
        if (method === 'GET') return getUst(req, res)
        if (method === 'POST') return postUst(req, res)
    } catch (error) {
        res.status(500).json({ code: 500, status: 'Internal Server Error', message: error.message })
    }
}