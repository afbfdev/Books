import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const API_KEY=YOUR API;

export const searchBook = createAsyncThunk('books/searchBook', async (subject) => {
    return axios
    .get(`https://www.googleapis.com/books/v1/volumes?q=${subject}&key=${API_KEY}&maxResults=20`)
    .then(res => res.data.items)
    .catch(error => error.data.message )
    
  }
);

const fetchBookSlice = createSlice({
  name: 'books',
  initialState: {
    searchResults: [],
    loading: false,
    error: null
  },
  reducers: {
    /*resetSearchResults: (state, action) => {
      state.searchResults = [];
    }*/
  },
  extraReducers: {
    [searchBook.pending]: (state, action) => {
      state.loading = true;
    },
    [searchBook.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.searchResults = action.payload;
    },
    [searchBook.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  }
});

export const { resetSearchResults } = fetchBookSlice.actions;

export default fetchBookSlice.reducer;
