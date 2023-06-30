import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user:
      typeof window !== 'undefined'
        ? JSON.parse(localStorage.getItem('user')) || []
        : [],
    token:
      typeof window !== 'undefined'
        ? JSON.parse(localStorage.getItem('token')) || ''
        : '',
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload
    },
    setToken(state, action) {
      state.token = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
        ...action.payload.projects,
      }
    })
  },
})

export const { setUser, setToken } = authSlice.actions

export default authSlice.reducer
