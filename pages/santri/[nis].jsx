import React, { useState, useEffect } from 'react'
import Navigasi from '../../components/Navigasi'
import Router from 'next/router'

export async function getServerSideProps(ctx){
    const { nis } = ctx.query
    const reqDataSantri = await fetch(`${process.env.PUBLIC_URL}/api/santri/${nis}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const resDataSantri = await reqDataSantri.json()
    const data = resDataSantri.code === 200 ? resDataSantri.data : []
    return {
        props: {
            nis,
            data
        }
    }
}

const DetailSantri = ({ nis, data }) => {

    const [fields, setFields] = useState(data)

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
        const reqUpdateSantri = await fetch(`/api/santri/${nis}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fields)
        })
        const resUpdateSantri = await reqUpdateSantri.json()
        if(resUpdateSantri.code !== 200) return alert(resUpdateSantri.message)
        alert(resUpdateSantri.message)
        Router.push('/santri')
    }
    
    useEffect(() => {
        if(data.length === 0){
            alert('Data santri tidak tersedia')
            Router.push('/santri')
        }
    }, [data])
    
    return (
        <>
            <Navigasi/>
            <div className="jumbotron mt-5 container">
                <h1 className="display-6">{fields.nis} - {fields.nama}</h1>
                <div className="my-4 row">
                        <label htmlFor="nis" className="col-sm-3 col-form-label">Nomor Induk Santri</label>
                        <div className="col-sm-9">
                            <input type="text" readonly className="form-control-plaintext" id="nis" name='nis' value={fields.nis}/>
                        </div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="nama" className="col-sm-3 col-form-label">Nama Santri</label>
                        <div className="col-sm-9">
                            <input type="text" className="form-control" id="nama" name='nama' onChange={e => handlerChange(e)} value={fields.nama}/>
                        </div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="jenisKelamin" className="col-sm-3 col-form-label">Jenis Kelamin</label>
                        <div className="col-sm-9">
                            <select className="form-select" aria-label="jenisKelamin" id="jenisKelamin" name='jenisKelamin' onChange={e => handlerChange(e)}>
                                {
                                    fields.jenisKelamin === 'L'?
                                    <>
                                        <option value="L" selected>Laki-laki</option>
                                        <option value="P">Perempuan</option>
                                    </>:
                                    <>
                                        <option value="L">Laki-laki</option>
                                        <option value="P" selected>Perempuan</option>
                                    </>
                                }
                            </select>
                        </div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="alamat" className="col-sm-3 col-form-label">Alamat</label>
                        <div className="col-sm-9">
                            <input type="text" className="form-control" id="alamat" name='alamat' onChange={e => handlerChange(e)} value={fields.alamat}/>
                        </div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="nohp" className="col-sm-3 col-form-label">Nomor Telepone</label>
                        <div className="col-sm-9">
                            <input type="text" className="form-control" id="nohp" name='nohp' onChange={e => handlerChange(e)} value={fields.nohp}/>
                        </div>
                    </div>

                    <div className="mb-3 row">
                        <div className="col-sm-3"/>
                        <div className="col-sm-9">
                            <button className='btn btn-success' onClick={e => handlerSubmit(e)}>Update</button>
                        </div>
                    </div>

            </div>
        </>
    )
}

export default DetailSantri