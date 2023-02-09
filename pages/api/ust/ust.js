import db from '../../../config/database.js'

export const getUst = async(req, res) => {
    try {
        const dataUst = await db('ust').select('*')
        if (dataUst.length === 0) return res.status(404).json({ code: 404, status: 'Not found', message: 'Data belum ada' })
        return res.status(200).json({ code: 200, status: 'OK', message: 'Berhasil GET data Ust', data: dataUst })
    } catch (error) {
        res.status(500).json({ code: 500, status: 'Internal Server Error', message: error.message })
    }
}

export const getUstByNip = async(req, res) => {
    try {
        const { nip } = req.query
        if (!nip) return res.status(400).json({ code: 404, status: 'Bad Request', message: 'NIP Dibutuhkan' })
        const dataUst = await db('ust').select('*').where({ nip }).first()
        if (!dataUst) return res.status(404).json({ code: 404, status: 'Not found', message: 'Data ust tidak tersedia' })
        return res.status(200).json({ code: 200, status: 'OK', message: `Berhasil GET data Ust, NIP : ${nip}`, data: dataUst })
    } catch (error) {
        res.status(500).json({ code: 500, status: 'Internal Server Error', message: error.message })
    }
}

export const postUst = async(req, res) => {
    try {
        const { nip, nama, jenisKelamin, alamat, nohp } = req.body
        if (!nip || !nama || !jenisKelamin || !alamat || !nohp) return res.status(404).json({ code: 404, status: 'Bad request', message: 'Data yang dibutuhkan tidak sesuai' })
        const dataUst = await db('ust').select('*').where({ nip }).first()
        if (dataUst) return res.status(404).json({ code: 404, status: 'Bad request', message: 'Data NIP sudah digunakan' })
        const tambahUst = await db('ust').insert({ nip, nama, jenisKelamin, alamat, nohp })
        if (tambahUst.length === 0) return res.status(404).json({ code: 400, status: 'Bad request', message: 'Data Ust Gagal ditambahkan' })
        return res.status(200).json({ code: 200, status: 'OK', message: `Berhasil Tambah data Ust dengan NIP : ${nip}` })
    } catch (error) {
        res.status(500).json({ code: 500, status: 'Internal Server Error', message: error.message })
    }
}

export const putUstByNip = async(req, res) => {
    try {
        const { nip, nama, jenisKelamin, alamat, nohp } = req.body
        if (!nip || !nama || !jenisKelamin || !alamat || !nohp) return res.status(404).json({ code: 404, status: 'Bad request', message: 'Data yang dibutuhkan tidak sesuai' })
        const dataUst = await db('ust').select('*').where({ nip }).first()
        if (!dataUst) return res.status(404).json({ code: 404, status: 'Not found', message: 'Data ust tidak tersedia' })
        const updateUst = await db('ust').where({ nip }).update({ nama, jenisKelamin, alamat, nohp })
        if (!updateUst) return res.status(400).json({ code: 400, status: 'Bad request', message: `Data ust ${nip} gagal diperbarui` })
        return res.status(200).json({ code: 200, status: 'OK', message: `Data ust ${nip} berhasil diperbarui` })
    } catch (error) {
        res.status(500).json({ code: 500, status: 'Internal Server Error', message: error.message })
    }
}

export const deleteUstByNip = async(req, res) => {
    try {
        const { nip } = req.query
        const { status } = req.body
        if (!status) return res.status(400).json({ code: 400, status: 'Bad request', message: 'Status tidak disetujui' })
        if (!nip) return res.status(404).json({ code: 404, status: 'Bad request', message: 'NIP dibutuhkan' })
        const dataUst = await db('ust').select('*').where({ nip }).first()
        if (!dataUst) return res.status(404).json({ code: 404, status: 'Not found', message: 'Data ust tidak tersedia' })
        const deleteUst = await db('ust').where({ nip }).del()
        if (deleteUst.length === 0) return res.status(400).json({ code: 400, status: 'Bad request', message: `Data ust ${nip} gagal dihapus` })
        return res.status(200).json({ code: 200, status: 'OK', message: `Data ust ${nip} berhasil dihapus` })
    } catch (error) {
        res.status(500).json({ code: 500, status: 'Internal Server Error', message: error.message })
    }
}