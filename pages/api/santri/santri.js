import db from '../../../config/database.js'

export const getSantri = async(req, res) => {
    try {
        const dataSantri = await db('santri').select('*')
        if (dataSantri.length === 0) return res.status(404).json({ code: 404, status: 'Not found', message: 'Data belum ada' })
        return res.status(200).json({ code: 200, status: 'OK', message: 'Berhasil GET data Santri', data: dataSantri })
    } catch (error) {
        res.status(500).json({ code: 500, status: 'Internal Server Error', message: error.message })
    }
}

export const getSantriByNis = async(req, res) => {
    try {
        const { nis } = req.query
        if (!nis) return res.status(400).json({ code: 404, status: 'Bad Request', message: 'NIS Dibutuhkan' })
        const dataSantri = await db('santri').select('*').where({ nis }).first()
        if (!dataSantri) return res.status(404).json({ code: 404, status: 'Not found', message: 'Data santri tidak tersedia' })
        return res.status(200).json({ code: 200, status: 'OK', message: `Berhasil GET data Santri, NIS : ${nis}`, data: dataSantri })
    } catch (error) {
        res.status(500).json({ code: 500, status: 'Internal Server Error', message: error.message })
    }
}

export const postSantri = async(req, res) => {
    try {
        const { nis, nama, jenisKelamin, alamat, nohp } = req.body
        if (!nis || !nama || !jenisKelamin || !alamat || !nohp) return res.status(404).json({ code: 404, status: 'Bad request', message: 'Data yang dibutuhkan tidak sesuai' })
        const dataSantri = await db('santri').select('*').where({ nis }).first()
        if (dataSantri) return res.status(404).json({ code: 404, status: 'Bad request', message: 'Data NIS sudah digunakan' })
        const tambahSantri = await db('santri').insert({ nis, nama, jenisKelamin, alamat, nohp })
        if (tambahSantri.length === 0) return res.status(404).json({ code: 400, status: 'Bad request', message: 'Data Santri Gagal ditambahkan' })
        return res.status(200).json({ code: 200, status: 'OK', message: `Berhasil Tambah data Santri dengan NIS : ${nis}` })
    } catch (error) {
        res.status(500).json({ code: 500, status: 'Internal Server Error', message: error.message })
    }
}

export const putSantriByNis = async(req, res) => {
    try {
        const { nis, nama, jenisKelamin, alamat, nohp } = req.body
        if (!nis || !nama || !jenisKelamin || !alamat || !nohp) return res.status(404).json({ code: 404, status: 'Bad request', message: 'Data yang dibutuhkan tidak sesuai' })
        const dataSantri = await db('santri').select('*').where({ nis }).first()
        if (!dataSantri) return res.status(404).json({ code: 404, status: 'Not found', message: 'Data santri tidak tersedia' })
        const updateSantri = await db('santri').where({ nis }).update({ nama, jenisKelamin, alamat, nohp })
        if (!updateSantri) return res.status(400).json({ code: 400, status: 'Bad request', message: `Data santri ${nis} gagal diperbarui` })
        return res.status(200).json({ code: 200, status: 'OK', message: `Data santri ${nis} berhasil diperbarui` })
    } catch (error) {
        res.status(500).json({ code: 500, status: 'Internal Server Error', message: error.message })
    }
}

export const deleteSantriByNis = async(req, res) => {
    try {
        const { nis } = req.query
        const { status } = req.body
        if (!status) return res.status(400).json({ code: 400, status: 'Bad request', message: 'Status tidak disetujui' })
        if (!nis) return res.status(404).json({ code: 404, status: 'Bad request', message: 'NIS dibutuhkan' })
        const dataSantri = await db('santri').select('*').where({ nis }).first()
        if (!dataSantri) return res.status(404).json({ code: 404, status: 'Not found', message: 'Data santri tidak tersedia' })
        const deleteSantri = await db('santri').where({ nis }).del()
        if (deleteSantri.length === 0) return res.status(400).json({ code: 400, status: 'Bad request', message: `Data santri ${nis} gagal dihapus` })
        return res.status(200).json({ code: 200, status: 'OK', message: `Data santri ${nis} berhasil dihapus` })
    } catch (error) {
        res.status(500).json({ code: 500, status: 'Internal Server Error', message: error.message })
    }
}