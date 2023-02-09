import db from '../../../config/database.js'

export const getPelajaran = async(req, res) => {
    try {
        const dataPelajaran = await db('pelajaran').select('*')
        if (dataPelajaran.length === 0) return res.status(404).json({ code: 404, status: 'Not found', message: 'Data belum ada' })
        return res.status(200).json({ code: 200, status: 'OK', message: 'Berhasil GET data Pelajaran', data: dataPelajaran })
    } catch (error) {
        res.status(500).json({ code: 500, status: 'Internal Server Error', message: error.message })
    }
}

export const getPelajaranByKodep = async(req, res) => {
    try {
        const { kodep } = req.query
        if (!kodep) return res.status(400).json({ code: 404, status: 'Bad Request', message: 'KODEP Dibutuhkan' })
        const dataPelajaran = await db('pelajaran').select('*').where({ kodep }).first()
        if (!dataPelajaran) return res.status(404).json({ code: 404, status: 'Not found', message: 'Data pelajaran tidak tersedia' })
        return res.status(200).json({ code: 200, status: 'OK', message: `Berhasil GET data Pelajaran, KODEP : ${kodep}`, data: dataPelajaran })
    } catch (error) {
        res.status(500).json({ code: 500, status: 'Internal Server Error', message: error.message })
    }
}

export const postPelajaran = async(req, res) => {
    try {
        const { kodep, namap, kelas, total_jam} = req.body
        if (!kodep || !namap || !kelas || !total_jam) return res.status(404).json({ code: 404, status: 'Bad request', message: 'Data yang dibutuhkan tidak sesuai' })
        const dataPelajaran = await db('pelajaran').select('*').where({ kodep }).first()
        if (dataPelajaran) return res.status(404).json({ code: 404, status: 'Bad request', message: 'Data KODEP sudah digunakan' })
        const tambahPelajaran = await db('pelajaran').insert({ kodep, namap, kelas, total_jam})
        if (tambahPelajaran.length === 0) return res.status(404).json({ code: 400, status: 'Bad request', message: 'Data Pelajaran Gagal ditambahkan' })
        return res.status(200).json({ code: 200, status: 'OK', message: `Berhasil Tambah data Pelajaran dengan KODEP : ${kodep}` })
    } catch (error) {
        res.status(500).json({ code: 500, status: 'Internal Server Error', message: error.message })
    }
}

export const putPelajaranByKodep = async(req, res) => {
    try {
        const { kodep, namap, kelas, total_jam } = req.body
        if (!kodep || !namap || !kelas || !total_jam) return res.status(404).json({ code: 404, status: 'Bad request', message: 'Data yang dibutuhkan tidak sesuai' })
        const dataPelajaran = await db('pelajaran').select('*').where({ kodep }).first()
        if (!dataPelajaran) return res.status(404).json({ code: 404, status: 'Not found', message: 'Data pelajaran tidak tersedia' })
        const updatePelajaran = await db('pelajaran').where({ kodep }).update({ namap, kelas, total_jam})
        if (!updatePelajaran) return res.status(400).json({ code: 400, status: 'Bad request', message: `Data pelajaran ${kodep} gagal diperbarui` })
        return res.status(200).json({ code: 200, status: 'OK', message: `Data pelajaran ${kodep} berhasil diperbarui` })
    } catch (error) {
        res.status(500).json({ code: 500, status: 'Internal Server Error', message: error.message })
    }
}

export const deletePelajaranByKodep = async(req, res) => {
    try {
        const { kodep } = req.query
        const { status } = req.body
        if (!status) return res.status(400).json({ code: 400, status: 'Bad request', message: 'Status tidak disetujui' })
        if (!kodep) return res.status(404).json({ code: 404, status: 'Bad request', message: 'KODEP dibutuhkan' })
        const dataPelajaran = await db('pelajaran').select('*').where({ kodep }).first()
        if (!dataPelajaran) return res.status(404).json({ code: 404, status: 'Not found', message: 'Data pelajaran tidak tersedia' })
        const deletePelajaran = await db('pelajaran').where({ kodep }).del()
        if (deletePelajaran.length === 0) return res.status(400).json({ code: 400, status: 'Bad request', message: `Data pelajaran ${kodep} gagal dihapus` })
        return res.status(200).json({ code: 200, status: 'OK', message: `Data pelajaran ${kodep} berhasil dihapus` })
    } catch (error) {
        res.status(500).json({ code: 500, status: 'Internal Server Error', message: error.message })
    }
}