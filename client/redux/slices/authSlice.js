import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    username: 'Username',
    role: 'user',
  },
  reducers: {
    setRole: () => {
      state.role = 'admin'
    },
  },
})

export const { setRole } = authSlice.actions

export default authSlice.reducer
