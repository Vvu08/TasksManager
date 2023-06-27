import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

export const projectsSlice = createSlice({
  name: 'projects',
  initialState: {
    projects: [],
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
      .addCase('users/getProjects/fulfilled', (state, action) => {
        state.projects = action.payload.data
      })
      .addCase('projects/create/fulfilled', (state, action) => {
        state.projects.push(action.payload.data)
      })
  },
})

export default projectsSlice.reducer
