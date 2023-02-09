import { getPerijinanByKodei, putPerijinanByKodei, deletePerijinanByKodei } from "./santri"

export default function handler(req, res) {
    try {
        const method = req.method
        if (method === 'GET') return getPerijinanByKodei(req, res)
        if (method === 'PUT') return putPerijinanByKodei(req, res)
        if (method === 'DELETE') return deletePerijinanByKodei(req, res)
    } catch (error) {
        res.status(500).json({ code: 500, status: 'Internal Server Error', message: error.message })
    }
}