import { configureStore} from '@reduxjs/toolkit'
import bookSlice from './reducerAddBooks'
import fetchBookSlice from './reducerFetchBooks'



const store = configureStore({
    reducer :  {
        Books: bookSlice,
        books: fetchBookSlice
    }
})

export default store