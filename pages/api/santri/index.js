import { getSantri, postSantri } from "./santri"

export default function handler(req, res) {
    try {
        const method = req.method
        if (method === 'GET') return getSantri(req, res)
        if (method === 'POST') return postSantri(req, res)
    } catch (error) {
        res.status(500).json({ code: 500, status: 'Internal Server Error', message: error.message })
    }
}