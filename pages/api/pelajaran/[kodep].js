import { getPelajaranByKodep, putPelajaranByKodep, deletePelajaranByKodep } from "./pelajaran"

export default function handler(req, res) {
    try {
        const method = req.method
        if (method === 'GET') return getPelajaranByKodep(req, res)
        if (method === 'PUT') return putPelajaranByKodep(req, res)
        if (method === 'DELETE') return deletePelajaranByKodep(req, res)
    } catch (error) {
        res.status(500).json({ code: 500, status: 'Internal Server Error', message: error.message })
    }
}