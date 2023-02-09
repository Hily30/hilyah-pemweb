import { getPerijinan, postPerijinan } from "./perjanjian"

export default function handler(req, res) {
    try {
        const method = req.method
        if (method === 'GET') return getPerijinan(req, res)
        if (method === 'POST') return postPerijinan(req, res)
    } catch (error) {
        res.status(500).json({ code: 500, status: 'Internal Server Error', message: error.message })
    }
}