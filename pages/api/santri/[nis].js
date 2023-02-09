import { getSantriByNis, putSantriByNis, deleteSantriByNis } from "./santri"

export default function handler(req, res) {
    try {
        const method = req.method
        if (method === 'GET') return getSantriByNis(req, res)
        if (method === 'PUT') return putSantriByNis(req, res)
        if (method === 'DELETE') return deleteSantriByNis(req, res)
    } catch (error) {
        res.status(500).json({ code: 500, status: 'Internal Server Error', message: error.message })
    }
}