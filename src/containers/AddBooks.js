import React from 'react'
import { useState} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { addBooks, removeBook, deleteAllBooks } from '../Redux/reducers/reducerAddBooks';
import FlipMove from 'react-flip-move';




const AddBooks = () => {
        
    /*const  initialState = {
        title: '',
        author: ''
    } */
  

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    
    
    const books = useSelector((state) => state.Books);
    console.log(books)
    const dispatch = useDispatch();



    const handleSubmit = e => {
        e.preventDefault();
       
        dispatch(addBooks({title, author}))
        //Vider le input
        setTitle('');
        setAuthor('')

    }

    const handleRemoveBook = id => {
        dispatch(removeBook({ id }));
      };

      const handleDeleteAllBooks = () => {
        dispatch(deleteAllBooks());
      };

  const displayData = books.length > 0 ? 
    <FlipMove>
     {
        books.map(data => {
            return (
                <li key={data.id} className="list-group-item list-group-item-light d-flex justify-content-between">
                    <span> <strong>Titre:</strong> {data.title} </span>
                    <span> <strong>Auteur:</strong> {data.author}</span>
                    <span className='btn btn-danger'
                    onClick={() => handleRemoveBook(data.id)}
                    >
                    x
                    </span>
                </li>
            )
        })
    }
    </FlipMove>
    : <p className="text-center">Aucune data à afficher</p>

    const deleteAllBooksBtn = books.length > 0 &&  
        <div className="d-flex justify-content-center">
             <button className="btn btn-danger mt-4 mb-5"
             onClick={() => handleDeleteAllBooks()}
             >
             Effacer tous les livres </button>
        </div>
  return (
    <main role="main">
        <div className="jumbotron jumbotron-fluid">
            <div className="container text-center">
                <h1 className="display-4">BOOKS</h1>
                <p>Ajouter un livre à votre bibliothéque</p>


                <form className="form-inline justify-content-center" onSubmit={handleSubmit}> 
                    <div className="form-group">
                        <input 
                           value={title} 
                           type="text" 
                           className="form-control"
                            placeholder="Titre"
                            required
                            onChange={e => setTitle(e.target.value)}    
                         />
                    </div>
                    <div className="form-group">
                        <input 
                           value={author}
                           type="text" 
                           className="form-control ml-3"
                            placeholder="Auteur"
                            required    
                            onChange={e => setAuthor(e.target.value)}    
                         />
                    </div>
                        <div className="form-group">
                             <button className="btn btn-outline-secondary ml-3">Ajouter un livre</button>  
                        </div>

                </form>
            </div>
        </div>
        <div className="container" style={{minHeight: '200px'}}>
            <div className="row">
                <div className="col-md-12">
                    <ul className="list-group">
                        {displayData}

                    </ul>

                </div>
                    {deleteAllBooksBtn}

            </div>
        </div>
    </main>
  )
}

/*const addStateToProps = state => {
    return {
        libraryData: state.library 
    }
}

const addDispatchToProps = (dispatch) => {
    return {
        addBooks: param => dispatch(addBook(param))
    }
}*/

export default AddBooks;
