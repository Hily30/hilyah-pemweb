import React, { useState, useEffect } from 'react'
import Navigasi from '../../components/Navigasi'
import Router from 'next/router'

export async function getServerSideProps(ctx){
    const { kodei } = ctx.query
    const reqDataPerijinan = await fetch(`${process.env.PUBLIC_URL}/api/perijinan/${kodei}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const resDataPerijinan = await reqDataPerijinan.json()
    const data = resDataPerijinan.code === 200 ? resDataPerijinan.data : []
    return {
        props: {
            kodei,
            data
        }
    }
}

const DetailPerijinan = ({ kodei, data }) => {

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
        const reqUpdatePerijinan = await fetch(`/api/perijinan/${kodei}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fields)
        })
        const resUpdatePerijinan = await reqUpdatePerijinan.json()
        if(resUpdatePerijinan.code !== 200) return alert(resUpdatePerijinan.message)
        alert(resUpdatePerijinan.message)
        Router.push('/perijinan')
    }
    
    useEffect(() => {
        if(data.length === 0){
            alert('Data perijinan tidak tersedia')
            Router.push('/perijinan')
        }
    }, [data])
    
    return (
        <>
            <Navigasi/>
            <div className="jumbotron mt-5 container">
                <h1 className="display-6">{fields.kodei} - {fields.nama}</h1>
                <div className="my-4 row">
                        <label htmlFor="kodei" className="col-sm-3 col-form-label">Kode Perijinan</label>
                        <div className="col-sm-9">
                            <input type="text" readonly className="form-control-plaintext" id="kodei" name='kodei' value={fields.kodei}/>
                        </div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="nama" className="col-sm-3 col-form-label">Nama</label>
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

export default DetailPerijinan