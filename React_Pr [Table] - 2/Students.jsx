import React, { useEffect, useState } from 'react'
import { StudentService } from '../services/studentservices'

export default function Student() {

    const [Student, setStudent] = useState([]);
    const [form, setForm] = useState({id:0, name:"", roll_number:"", department:"", year:"", contact:"", date:""})

    useEffect(()=> {
        StudentService.getAll().then(setStudent)
    },[])

    const handleChange = (e) => {
        setForm({...form, [e.target.name] : e.target.value})
    }

    function handleAdd(){
        if(!form.name || !form.roll_number || !form.department || !form.year || !form.contact || !form.date ){
            alert("Invalid Credentials")
            return;
        }

        StudentService.add(form).then(() => {
            StudentService.getAll().then(setStudent)
        })
    }

    function handleDelete(id){
        StudentService.delete(id).then(() => {
            StudentService.getAll().then(setStudent)
        })
    }

    function handleEdit(){
        StudentService.update(form).then(() => {
            StudentService.getAll().then(setStudent)
        })
    }

    const onChangeEdit = (e) => {
        setForm({
            id: e.id,
            name: e.name, 
            roll_number: e.roll_number, 
            department: e.department, 
            year: e.year, 
            contact: e.contact, 
            date: e.date
        })
    }

    function handleClear(){
        setForm({id:0, name:"", roll_number:"", department:"", year:"", contact:"", date:""})
    }

    return(
        <>
        <h1 className="header-title text-danger">Student Management System</h1>
        <hr/>
        <div className="container">
            <div className="row">
                <div className="col-md-8">
                    <h2 className="sub-header mb-3 text-secondary">Student List</h2>
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped">
                            <thead className="table-dark">
                                <tr>
                                    <th className="align-top text-center">Id</th>
                                    <th className="align-top text-center">Department</th>
                                    <th className="align-top text-center">Name</th>
                                    <th className="align-top text-center">Roll Number</th>
                                    <th className="align-top text-center">Year</th>
                                    <th className="align-top text-center">Contact</th>
                                    <th className="align-top text-center">Date</th>
                                    <th className="align-top text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    Student.map(std => (
                                        <tr key={std.id} className="text-centre">
                                            <td>{std.id}</td>
                                            <td>{std.department}</td>
                                            <td>{std.name}</td>
                                            <td>{std.roll_number}</td>
                                            <td>{std.year}</td>
                                            <td>{std.contact}</td>
                                            <td>{std.date}</td>
                                            <td>
                                                <button className="btn btn-danger btn-sm me-2" onClick={() => handleDelete(std.id)}>Delete</button>
                                                <button className="btn btn-info btn-sm" onClick={() => onChangeEdit(std)}>Edit</button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-md-4">
                    <h2>Add/Update Record</h2>
                    <hr/>
                    <input className="form-control m-3" name="name" value={form.name} onChange={handleChange} placeholder="Enter Student Name" />
                    <input className="form-control m-3" name="roll_number" value={form.roll_number} onChange={handleChange} placeholder="Enter Roll Number" />
                    <input className="form-control m-3" name="department" value={form.department} onChange={handleChange} placeholder="Enter Department" />
                    <input className="form-control m-3" name="year" value={form.year} onChange={handleChange} placeholder="Enter Student Year" />
                    <input className="form-control m-3" name="contact" value={form.contact} onChange={handleChange} placeholder="Enter Contact No" />
                    <input className="form-control m-3" name="date" value={form.date} onChange={handleChange} placeholder="date(eg:- 01feb2020)" />
                    <button className="btn btn-primary ms-2" onClick={handleAdd}>Add Record</button>
                    <button className="btn btn-success mx-2" onClick={handleEdit}>Update</button>
                    <button className="btn btn-warning" onClick={handleClear}>Clear</button>
                </div>
            </div>
        </div>
        </>
    )

}
