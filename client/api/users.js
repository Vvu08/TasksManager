import { instanceOne } from './axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
const name = 'user'

export const getUsers = async () => {
  try {
    return await instanceOne.get(name)
  } catch (error) {
    return error
  }
}

export const getUser = async (id) => {
  try {
    return await instanceOne.get(name + '/' + id)
  } catch (error) {
    return error
  }
}

export const getProjectsByUser = createAsyncThunk(
  'users/getProjects',
  async (id) => {
    try {
      return await instanceOne.get(name + '/' + id + '/projects')
    } catch (error) {
      throw error
    }
  }
)

export const getTasksByUser = async (id) => {
  try {
    return await instanceOne.get(name + '/' + id + '/task')
  } catch (error) {
    throw error
  }
}

export const createUser = async (username, email, password, jobTitle) => {
  try {
    return await instanceOne.post('auth/register', {
      username,
      email,
      password,
      jobTitle,
    })
  } catch (error) {
    return error
  }
}

export const loginUser = createAsyncThunk(
  'users/login',
  async (username, password) => {
    try {
      return await instanceOne.post('auth/login', {
        username,
        password,
      })
    } catch (error) {
      return error
    }
  }
)

export const updateRole = async (userId, roleId) => {
  try {
    return await instanceOne.put(name + '/' + userId + '/updateRole/' + roleId)
  } catch (error) {
    return error
  }
}
