import db from '../../../config/database.js'

export const getPerijinan = async(req, res) => {
    try {
        const dataPerijinan = await db('perijinan').select('*')
        if (dataPerijinan.length === 0) return res.status(404).json({ code: 404, status: 'Not found', message: 'Data belum ada' })
        return res.status(200).json({ code: 200, status: 'OK', message: 'Berhasil GET data Perijinan', data: dataPerijinan })
    } catch (error) {
        res.status(500).json({ code: 500, status: 'Internal Server Error', message: error.message })
    }
}

export const getPerijinanByNis = async(req, res) => {
    try {
        const { kodei } = req.query
        if (!kodei) return res.status(400).json({ code: 404, status: 'Bad Request', message: 'KODEI Dibutuhkan' })
        const dataPerijinan = await db('perijinan').select('*').where({ kodei }).first()
        if (!dataPerijinan) return res.status(404).json({ code: 404, status: 'Not found', message: 'Data perijinan tidak tersedia' })
        return res.status(200).json({ code: 200, status: 'OK', message: `Berhasil GET data Perijinan, KODEI : ${kodei}`, data: dataPerijinan })
    } catch (error) {
        res.status(500).json({ code: 500, status: 'Internal Server Error', message: error.message })
    }
}

export const postPerijinan = async(req, res) => {
    try {
        const { kodei, nama,  petugas} = req.body
        if (!kodei || !nama | !petugas) return res.status(404).json({ code: 404, status: 'Bad request', message: 'Data yang dibutuhkan tidak sesuai' })
        const dataPerijinan = await db('perijinan').select('*').where({ kodei }).first()
        if (dataPerijinan) return res.status(404).json({ code: 404, status: 'Bad request', message: 'Data KODEI sudah digunakan' })
        const tambahPerijinan = await db('perijinan').insert({ kodei, nama,  petugas})
        if (tambahPerijinan.length === 0) return res.status(404).json({ code: 400, status: 'Bad request', message: 'Data Perijinan Gagal ditambahkan' })
        return res.status(200).json({ code: 200, status: 'OK', message: `Berhasil Tambah data Perijinan dengan KODEI : ${kodei}` })
    } catch (error) {
        res.status(500).json({ code: 500, status: 'Internal Server Error', message: error.message })
    }
}

export const putPerijinanByNis = async(req, res) => {
    try {
        const { kodei, nama, petugas} = req.body
        if (!kodei || !nama || !petugas) return res.status(404).json({ code: 404, status: 'Bad request', message: 'Data yang dibutuhkan tidak sesuai' })
        const dataPerijinan = await db('perijinan').select('*').where({ kodei }).first()
        if (!dataPerijinan) return res.status(404).json({ code: 404, status: 'Not found', message: 'Data perijinan tidak tersedia' })
        const updatePerijinan = await db('perijinan').where({ kodei }).update({ nama, petugas })
        if (!updatePerijinan) return res.status(400).json({ code: 400, status: 'Bad request', message: `Data perijinan ${kodei} gagal diperbarui` })
        return res.status(200).json({ code: 200, status: 'OK', message: `Data perijinan ${kodei} berhasil diperbarui` })
    } catch (error) {
        res.status(500).json({ code: 500, status: 'Internal Server Error', message: error.message })
    }
}

export const deletePerijinanByNis = async(req, res) => {
    try {
        const { kodei } = req.query
        const { status } = req.body
        if (!status) return res.status(400).json({ code: 400, status: 'Bad request', message: 'Status tidak disetujui' })
        if (!kodei) return res.status(404).json({ code: 404, status: 'Bad request', message: 'KODEI dibutuhkan' })
        const dataPerijinan = await db('perijinan').select('*').where({ kodei }).first()
        if (!dataPerijinan) return res.status(404).json({ code: 404, status: 'Not found', message: 'Data perijinan tidak tersedia' })
        const deletePerijinan = await db('perijinan').where({ kodei }).del()
        if (deletePerijinan.length === 0) return res.status(400).json({ code: 400, status: 'Bad request', message: `Data perijinan ${kodei} gagal dihapus` })
        return res.status(200).json({ code: 200, status: 'OK', message: `Data perijinan ${kodei} berhasil dihapus` })
    } catch (error) {
        res.status(500).json({ code: 500, status: 'Internal Server Error', message: error.message })
    }
}