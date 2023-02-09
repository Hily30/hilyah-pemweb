import { getUstByNip, putUstByNip, deleteUstByNip } from "./ust"

export default function handler(req, res) {
    try {
        const method = req.method
        if (method === 'GET') return getUstByNip(req, res)
        if (method === 'PUT') return putUstByNip(req, res)
        if (method === 'DELETE') return deleteUstByNip(req, res)
    } catch (error) {
        res.status(500).json({ code: 500, status: 'Internal Server Error', message: error.message })
    }
}