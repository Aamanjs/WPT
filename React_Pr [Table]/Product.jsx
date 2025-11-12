import React, { useEffect, useState } from 'react'
import { ProductService } from '../Services/productservice' 

export default function Product() {

    const [Product, setProduct] = useState([])
    const [form, setForm] = useState({id:0, name:"", category:"", quantity:"", price:"", supplier:"", added_date:""})

    useEffect(() => {
        ProductService.getAll().then(setProduct)
    },[])

    const handleChange = (e) => {
        setForm({...form, [e.target.name] : e.target.value})
    }

    function handleAdd(){

        if(!form.name || !form.category || !form.quantity || !form.price || !form.supplier || !form.added_date){
            alert("Invalid Credentials")
            return;
        }

        ProductService.add(form).then(() => {
            ProductService.getAll().then(setProduct)
        })
    }

    function handleDelete(id){
        ProductService.delete(id).then(() => {
            ProductService.getAll().then(setProduct)
        })
    }

    function handleEdit(){
        ProductService.update(form).then(() => {
            ProductService.getAll().then(setProduct)
        })
    }

    const onChangeEdit = (e) => {
        setForm({
            id: e.id,
            name: e.name, 
            category: e.category, 
            quantity: e.quantity, 
            price: e.price, 
            supplier: e.supplier, 
            added_date: e.added_date
        })
    }

    function handleClear(){
        setForm({id:0, name:"", category:"", quantity:"", price:"", supplier:"", added_date:""})
    }

    return(
        <>
        <h1 className="header-title">Product Management System</h1>
        <hr style={{ borderColor: 'white'}} />
        <div className="container">
            <div className="row">
                <div className="col-md-8">
                    <h2 className="sub-header">Product List</h2>
                    <table className="table table-bordered table_striped" style={{ borderRadius: '20px', overflow: 'hidden' }}>
                        <thead className='table-dark'>
                            <tr>
                                <th className='align-top text-center'>Category</th>
                                <th className='align-top text-center'>Name</th>
                                <th className='align-top text-center'>Quantity</th>
                                <th className='align-top text-center'>Price</th>
                                <th className='align-top text-center'>Supplier</th>
                                <th className='align-top text-center'>Added Date</th>
                                <th className='align-top text-center'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Product.map(pdt => (
                                    <tr key={pdt.id} className='bg-light'>
                                        <td>{pdt.category}</td>
                                        <td>{pdt.name}</td>
                                        <td>{pdt.quantity}</td>
                                        <td>{pdt.price}</td>
                                        <td>{pdt.supplier}</td>
                                        <td>{pdt.added_date}</td> 
                                        <td>
                                            <button className='btn btn-danger btn-sm' onClick={() => handleDelete(pdt.id)}>Delete</button>
                                            <button className='btn btn-info btn-sm ms-2 mt-2' onClick={() => onChangeEdit(pdt)}>Edit</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <div className="col-md-4">
                    <h2 style={{ color: '#e1e1e1ff' }}>Add/Update Record</h2>
                    <hr style={{ borderColor: 'white' }}/>
                    <input className="form-control m-3" name="category" value={form.category} onChange={handleChange} placeholder="Enter Category"/>
                    <input className="form-control m-3" name="name" value={form.name} onChange={handleChange} placeholder="Enter Product"/>
                    <input className="form-control m-3" name="quantity" value={form.quantity} onChange={handleChange} placeholder="Enter Quantity"/>
                    <input className="form-control m-3" name="price" value={form.price} onChange={handleChange} placeholder="Enter Price"/>
                    <input className="form-control m-3" name="supplier" value={form.supplier} onChange={handleChange} placeholder="Enter Supplier"/>
                    <input className="form-control m-3" name="added_date" value={form.added_date} onChange={handleChange} placeholder="date(eg:- 01feb2020)"/>
                    <button className="btn btn-primary ms-2" onClick={handleAdd}>Add Record</button>
                    <button className="btn btn-success mx-2" onClick={handleEdit}>Update</button>
                    <button className="btn btn-warning mx-" onClick={handleClear}>Clear</button>
                </div>
            </div>
        </div>
        </>
    )
}
