import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './slices/authSlice'
import { createWrapper } from 'next-redux-wrapper'
import thunk from 'redux-thunk'

const makeStore = () => {
  const store = configureStore({
    reducer: {
      [authSlice.name]: authSlice.reducer,
    },
    middleware: [thunk],
    devTools: process.env.NODE_ENV !== 'production',
  })
  return store
}

export const wrapper = createWrapper(makeStore)
