import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(HYDRATE, (state, action) => {
        return {
          ...state,
          ...action.payload.projects,
        }
      })
      .addCase('users/login/fulfilled', (state, action) => {
        state.user = action.payload.data
      })
  },
})

export const { setRole } = authSlice.actions

export default authSlice.reducer
