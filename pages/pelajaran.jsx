import React, { useState, useEffect } from 'react'
import Navigasi from '../components/Navigasi'
import Link from 'next/link'
import Router from 'next/router'


export async function getServerSideProps(ctx){

    const reqUst = await fetch(`${process.env.PUBLIC_URL}/api/pelajaran`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const resUst = await reqUst.json()
    const data = resUst.code === 200 ? resUst.data : []
    return {
        props: {
            data
        }
    }
}

const Pelajaran = ({ data }) => {

    const [fields, setFields] = useState({
        kodep: '',
        namap: '',
        kelas: '',
        total_jam: '1 jam',
        
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
        const reqTambahPelajaran = await fetch('/api/pelajaran', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fields)
        })
        const resTambahUst = await reqTambahPelajaran.json()
        if(resTambahUst.code === 200) return alert(resTambahUst.message),Router.push('/pelajaran')
        return alert(resTambahUst.message)
    }

    const handlerDelete = async(e, kodep) => {
        e.preventDefault()
        const status = confirm(`Yakin ingin menghapus data pelajaran dengan KODEP : ${kodep} ?`)
        const reqDeletePelajaran = await fetch(`/api/pelajaran/${kodep}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status })
        })
        const resDeleteUst = await reqDeletePelajaran.json()
        if(resDeleteUst.code !== 200){
            alert(resDeleteUst.message)
        }else{
            alert(resDeleteUst.message)
            Router.push('/pelajaran')
        }
    }

    return (
        <>
            <Navigasi/>
            <div className="container mt-5">
            <button type="button" className="btn btn-success mb-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
                [+] Tambah Pelajaran
            </button>

            <div className="modal modal-lg fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Tambah Data Pelajaran</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    
                    <div className="mb-3 row">
                        <label htmlFor="kodep" className="col-sm-3 col-form-label">Kode Pelajaran</label>
                        <div className="col-sm-9">
                            <input type="text" className="form-control" id="kodep" name='kodep' onChange={e => handlerChange(e)} value={fields.kodep}/>
                        </div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="namap" className="col-sm-3 col-form-label">Nama Pelajaran</label>
                        <div className="col-sm-9">
                            <input type="text" className="form-control" id="namap" name='namap' onChange={e => handlerChange(e)} value={fields.namap}/>
                        </div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="kelas" className="col-sm-3 col-form-label">Kelas</label>
                        <div className="col-sm-9">
                            <input type="text" className="form-control" id="kelas" name='kelas' onChange={e => handlerChange(e)} value={fields.kelas}/>
                        </div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="total_jam" className="col-sm-3 col-form-label">Total Jam</label>
                        <div className="col-sm-9">
                            <select className="form-select" aria-label="total_jam" id="total_jam" name='total_jam' onChange={e => handlerChange(e)}>
                            {
                                fields.total_jam === '1 jam'?
                                <>
                                    <option value="1 jam" selected>1 jam</option>
                                    <option value="2 jam">2 jam</option>
                                </>:
                                <>
                                    <option value="1 jam">1 jam</option>
                                    <option value="2 jam" selected>2 jam</option>
                                </>
                            }
                            </select>
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
                            <th scope="col">Kode Pelajaran</th>
                            <th scope="col">Nama Pelajaran</th>
                            <th scope="col">Kelas</th>
                            <th scope="col">Total Jam</th>
                            <th scope="col">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data && data.length !== 0 ?
                            data.map((element, index) => {
                                    return  <tr key={index}>
                                                <th scope="row">{index+1}</th>
                                                <td>{element.kodep}</td>
                                                <td>{element.namap}</td>
                                                <td>{element.kelas}</td>
                                                <td>{element.total_jam}</td>
                                            
                                                <td className='d-flex flex-row gap-1'>
                                                    <Link href={`/pelajaran/${element.kodep}`} className='btn btn-warning btn-sm'>Edit</Link>
                                                    <button className='btn btn-danger btn-sm' onClick={e => handlerDelete(e, element.kodep)}>Hapus</button>
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

export default Pelajaran