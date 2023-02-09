import React, { useState, useEffect } from 'react'
import Navigasi from '../../components/Navigasi'
import Router from 'next/router'

export async function getServerSideProps(ctx){
    const { kodep } = ctx.query
    const reqDataUst = await fetch(`${process.env.PUBLIC_URL}/api/pelajaran/${kodep}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const resDataUst = await reqDataUst.json()
    const data = resDataUst.code === 200 ? resDataUst.data : []
    return {
        props: {
            kodep,
            data
        }
    }
}

const DetailUst = ({ kodep, data }) => {

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
        const reqUpdateUst = await fetch(`/api/pelajaran/${kodep}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fields)
        })
        const resUpdateUst = await reqUpdateUst.json()
        if(resUpdateUst.code !== 200) return alert(resUpdateUst.message)
        alert(resUpdateUst.message)
        Router.push('/pelajaran')
    }
    
    useEffect(() => {
        if(data.length === 0){
            alert('Data pelajaran tidak tersedia')
            Router.push('/pelajaran')
        }
    }, [data])
    
    return (
        <>
            <Navigasi/>
            <div className="jumbotron mt-5 container">
                <h1 className="display-6">{fields.kodep} - {fields.namap}</h1>
                <div className="my-4 row">
                        <label htmlFor="kodep" className="col-sm-3 col-form-label">Kode Pelajaran</label>
                        <div className="col-sm-9">
                            <input type="text" readonly className="form-control-plaintext" id="kodep" name='kodep' value={fields.kodep}/>
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
                                    <option value="1">1 jam</option>
                                    <option value="2" selected>2 jam</option>
                                </>
                            }                                                                  
                            </select>
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

export default DetailPelajaran