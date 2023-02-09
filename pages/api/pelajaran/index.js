import { getPelajaran, postPelajaran } from "./pelajaran"

export default function handler(req, res) {
    try {
        const method = req.method
        if (method === 'GET') return getPelajaran(req, res)
        if (method === 'POST') return postPelajaran(req, res)
    } catch (error) {
        res.status(500).json({ code: 500, status: 'Internal Server Error', message: error.message })
    }
}