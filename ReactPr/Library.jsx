import React, {useEffect, useState} from "react";
import { LibraryService } from "../Services/Library_Service";

export default function Library() {

    const [Library, setLibrary] = useState([]);
    const [form, setForm] = useState({book_id: 0, title: "", publication_year: "", author: "", genre: "", availability: ""})
    
    useEffect(() => {
        LibraryService.getAll().then(setLibrary);
    }, [])

    //UI Operations
    const handleChange = (e) => {
        setForm({...form, [e.target.name] : e.target.value})
    }

    const handleClear = () => {
        setForm({})
    }

    function handleAdd(){
        if(!form.title || !form.publication_year || !form.author || !form.genre || !form.availability){
            alert("Details not set, validation failed");
            return;
        }
        LibraryService.add(form).then(() => {
            LibraryService.getAll().then(setLibrary)
        });
    }

    function handleDelete (book_id){
        console.log(book_id)
        LibraryService.delete(book_id).then(() => {
            LibraryService.getAll().then(setLibrary);
        });
    }

    function handleEdit(){
        LibraryService.update(form).then(() => {
            LibraryService.getAll().then(setLibrary)
        });
    }

    const onChangeEdit = (e) => {
        setForm({
            book_id: e.book_id,
            title: e.title, 
            publication_year: e.publication_year,
            author: e.author, 
            genre: e.genre, 
            availability: e.availability
        })
    }


    return (
        <>
        <h1 className='h1 text-danger'> Library Management Software</h1>
        <hr/>
        <div className="container">
            <div className="row">
                <div className="col-md-8">
                    <div className="container">
                        <div className="row">
                            {
                                Library.map(lib => {
                                    return(
                                        <div key={lib.book_id} className="col-md-6">
                                            <div className="card mb-3 position-relative bg-light">
                                                <div className="card-title text-primary text-center mt-3">{lib.title}</div>
                                                <hr />
                                                <div className="card-body">
                                                    <p>Publication Year: {lib.publication_year}</p>
                                                    <p>Author: {lib.author}</p>
                                                    <p>Genre: {lib.genre}</p>
                                                    <p>Availibility: {lib.availability}</p>
                                                    <button className="btn btn-danger"
                                                    onClick={()=> {handleDelete(lib.book_id)}}>
                                                        Delete
                                                    </button>
                                                    <button className="btn btn-info mx-2"
                                                    onClick={()=> {onChangeEdit(lib)}}>
                                                        Edit
                                                    </button>
                                                </div>    
                                            </div>
                                        </div>    
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <h2>Add/Update Record</h2>
                    <hr/>
                    <input className='form-control m-3' name='title' value={form.title} onChange={handleChange} placeholder="Enter Book Title"/>
                    <input className='form-control m-3' name='publication_year' value={form.publication_year} onChange={handleChange} placeholder="Enter Publication Year"/>
                    <input className='form-control m-3' name='author' value={form.author} onChange={handleChange} placeholder="Enter Author Name"/>
                    <input className='form-control m-3' name='genre' value={form.genre} onChange={handleChange} placeholder="Enter Genre"/>
                    <input className='form-control m-3' name='availability' value={form.availability} onChange={handleChange} placeholder="Enter Availability"/>
                    <button onClick={handleAdd} className="btn btn-primary p-1 ms-3">Add record</button>
                    <button onClick={handleEdit} className="btn btn-success p-1 mx-3">Update record</button>
                    <button onClick={handleClear} className="btn btn-warning p-1">Clear</button>
                </div>
            </div>
        </div>
        </>
    )
}
