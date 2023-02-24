import React from 'react'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { searchBook} from '../Redux/reducers/reducerFetchBooks';
import {addBooks} from '../Redux/reducers/reducerAddBooks';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SearchBooks = () => {

    const dispatch = useDispatch();
    const searchResults = useSelector(state =>state.books.searchResults);
    const isLoading = useSelector(state =>state.books.loading);
    const handleError = useSelector(state =>state.books.error)
    console.log(searchResults)

    useSelector(state=>state.Books)

    const [subject, setSubject] = useState('');
    
    const handleSubmit = e => {
        e.preventDefault()
        dispatch(searchBook(subject));
    }


    const handleSave = (title, author) => {
        const bookToSave = {title:title, author:title}
            dispatch(addBooks(bookToSave))
            toast.info("Livre Enregistré",
             {position: "bottom-right",
             autoClose: 5000,
             hideProgressBar: false,
             closeOnClick: true,
             pauseOnHover: true,
             draggable: true,
             progress: undefined,
             theme: "colored",
            })
    }

    const displayFetchBooks =  isLoading ? (
        <div className="d-flex justify-content-center">
            <div className="spinner-border text-info" role="status">
                <span className="sr-only">Loading...</span>
            </div>

        </div>
    )
    : handleError !==null ? (
        <p>{handleError}</p>
    )
    :
    (
        searchResults.map(data => {
            return (
                <div className="card mb-2" key={data.id}>
                        <div className="card-header">
                            <h5 className="mb-0">
                                <button 
                                className="btn btn-link collapsed"
                                data-toggle="collapse"
                                data-target={`#${data.id}`}
                                aria-expanded= "false"
                                >
                                { data.volumeInfo.title }

                                </button>
                            </h5>
                        </div>
                        <div id={ data.id } className="collapse" data-parent= "#accordion">
                                <div className="card-body">
                                    {
                                        data.volumeInfo.hasOwnProperty('imageLinks') &&
                                        <img src={ data.volumeInfo.imageLinks.thumbnail } alt= { data.volumeInfo.title } />

                                    }

                                <br/>
                                <h4 className="card-title"> Titre: { data.volumeInfo.title }</h4>
                                <h5 className="card-title"> Auteurs: { data.volumeInfo.authors }</h5>
                                <p className="card-text"> Description: { data.volumeInfo.description }</p>
                                <a className="btn btn-outline-secondary"
                                 target= "_blank"
                                  rel= "noopener noreferrer"
                                  href={ data.volumeInfo.previewLink }
                                  >Plus d'infos</a>
                                  <button className="btn btn-outline-secondary ml-3"
                                  onClick={()=>handleSave(data.volumeInfo.title, data.volumeInfo.authors)}
                                  >Enregister</button>

                </div>

        </div>

    </div>
            )
        })
        
    )


  return (
    <main role="main">
        <div className="jumbotron jumbotron-fluid">
            <div className="container text-center">
                <h1 className="display-4">BOOKS</h1>
                <p>Indiquez le sujet du livre à rechercher</p>

                    
                <form className="form-inline justify-content-center" 
                    onSubmit={handleSubmit}
                > 
                    <div className="form-group">
                        <input 
                           type="text" 
                           className="form-control"
                            placeholder="Quoi rechercher ?"
                            required
                            value={subject}
                            onChange= {e => setSubject(e.target.value)}
                         />
                    </div>
                    
                        <div className="form-group">
                             <button className="btn btn-outline-secondary ml-3"
                             >Rechercher
                             </button>  
                        </div>

                </form>
            </div>
        </div>

        <div className="container" style={{minHeight: '200px'}}>
            <div id="accordion">
        
                    {displayFetchBooks}
                    <ToastContainer />
            </div>

        </div>
    </main>    
  )
}

export default SearchBooks