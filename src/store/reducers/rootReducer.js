import axios from 'axios'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   repose: [],
   isFetching: true,
}

export const rootReducer = createSlice({
   name: 'rootReducer',
   initialState,
   reducers: {
      getRepo: (state, action) => {
         state.repose = action.payload
      },
   },
})

export const setRepose = () =>
   async dispatch => {
      const data = await axios('https://jsonplaceholder.typicode.com/todos/1')
      const response = await data.data
      dispatch(getRepo(response))
   }

// Action creators are generated for each case reducer function
export const { getRepo } = rootReducer.actions

export default rootReducer.reducer