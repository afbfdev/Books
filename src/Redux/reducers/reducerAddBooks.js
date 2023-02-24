//import {ADD_BOOKS} from '../constants'
//import { v4 as uuidv4 } from 'uuid';
import { createSlice } from '@reduxjs/toolkit';

const initialState = localStorage.getItem('Books')
  ? JSON.parse(localStorage.getItem('Books'))
  : [];

export const bookSlice = createSlice ({
    name : "Books",
    initialState,

    reducers : {
        addBooks : (state, action) => {
            state.push({
                id: Math.random() * 100,
                title: action.payload.title,
                author: action.payload.author
            });
            localStorage.setItem('Books', JSON.stringify(state));
            },

            removeBook: (state, action) => {
                const index = state.findIndex(data => data.id === action.payload.id);
                state.splice(index, 1);
                localStorage.setItem('Books', JSON.stringify(state));
            },
            
            deleteAllBooks: state => {
                state = [];
                localStorage.setItem('Books', JSON.stringify(state));
                return state;
              },
        }
    }

)


export const {addBooks, removeBook, deleteAllBooks} = bookSlice.actions;
export default bookSlice.reducer