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
    roleId:
      typeof window !== 'undefined'
        ? JSON.parse(localStorage.getItem('roleId')) || 1
        : 1,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload
    },
    setToken(state, action) {
      state.token = action.payload
    },
    setRoleId(state, action) {
      state.roleId = action.payload
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

export const { setUser, setToken, setRoleId } = authSlice.actions

export default authSlice.reducer
