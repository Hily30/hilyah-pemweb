import React, { useState, useEffect } from 'react'
import Navigasi from '../components/Navigasi'
import Link from 'next/link'
import Router from 'next/router'


export async function getServerSideProps(ctx){

    const reqPerijinan = await fetch(`${process.env.PUBLIC_URL}/api/perijinan`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const resPerijinan = await reqPerijinan.json()
    const data = resPerijinan.code === 200 ? resPerijinan.data : []
    return {
        props: {
            data
        }
    }
}

const Perijinan = ({ data }) => {

    const [fields, setFields] = useState({
        kodei: '',
        nama: '',
        petugas: '',
    }) 

    const handlerChange = (e) => {
        e.preventDefault()
        const name = e.target.name
        setFields({
            ...fields,
            [name]: e.target.value
        })
    }

    const handlerSubmit = async(e) => {
        e.preventDefault()
        const reqTambahPerijinan = await fetch('/api/perijinan', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fields)
        })
        const resTambahPerijinan = await reqTambahPerijinan.json()
        if(resTambahPerijinan.code === 200) return alert(resTambahPerijinan.message),Router.push('/perijinan')
        return alert(resTambahPerijinan.message)
    }

    const handlerDelete = async(e, kodei) => {
        e.preventDefault()
        const status = confirm(`Yakin ingin menghapus data perijinan dengan KODEI : ${kodei} ?`)
        const reqDeletePerijinan = await fetch(`/api/perijinan/${kodei}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status })
        })
        const resDeletePerijinan = await reqDeletePerijinan.json()
        if(resDeletePerijinan.code !== 200){
            alert(resDeletePerijinan.message)
        }else{
            alert(resDeletePerijinan.message)
            Router.push('/perijinan')
        }
    }

    return (
        <>
            <Navigasi/>
            <div className="container mt-5">
            <button type="button" className="btn btn-success mb-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
                [+] Tambah Perijinan
            </button>

            <div className="modal modal-lg fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Tambah Data Perijinan</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    
                    <div className="mb-3 row">
                        <label htmlFor="kodei" className="col-sm-3 col-form-label">Kode Perijinan</label>
                        <div className="col-sm-9">
                            <input type="text" className="form-control" id="kodei" name='kodei' onChange={e => handlerChange(e)} value={fields.kodei}/>
                        </div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="nama" className="col-sm-3 col-form-label">Nama </label>
                        <div className="col-sm-9">
                            <input type="text" className="form-control" id="nama" name='nama' onChange={e => handlerChange(e)} value={fields.nama}/>
                        </div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="petugas" className="col-sm-3 col-form-label">Petugas</label>
                        <div className="col-sm-9">
                            <input type="text" className="form-control" id="petugas" name='petugas' onChange={e => handlerChange(e)} value={fields.petugas}/>
                        </div>
                    </div>

                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-success" onClick={e => handlerSubmit(e)}>Simpan</button>
                </div>
                </div>
            </div>
            </div>
                <table className="table">
                    <thead className="bg-dark text-white">
                        <tr>
                            <th scope="col">No</th>
                            <th scope="col">KODEI</th>
                            <th scope="col">Nama</th>       
                            <th scope="col">Petugas</th>
                            <th scope="col">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data && data.length !== 0 ?
                            data.map((element, index) => {
                                    return  <tr key={index}>
                                                <th scope="row">{index+1}</th>
                                                <td>{element.kodei}</td>
                                                <td>{element.nama}</td>
                                                <td>{element.petugas}</td>
                                                <td className='d-flex flex-row gap-1'>
                                                    <Link href={`/perijinan/${element.kodei}`} className='btn btn-warning btn-sm'>Edit</Link>
                                                    <button className='btn btn-danger btn-sm' onClick={e => handlerDelete(e, element.kodei)}>Hapus</button>
                                                </td>
                                            </tr>
                                }):
                            <tr>
                                <td>Data Belum Tersedia</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Perijinan