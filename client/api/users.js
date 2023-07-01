import { instanceOne } from './axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
const name = 'user'

export const getUsers = createAsyncThunk(
  'users/getAllUsers',
  async (_, { getState }) => {
    try {
      return await instanceOne.get(name, {
        headers: {
          Authorization: 'Bearer ' + getState().auth.token,
        },
      })
    } catch (error) {
      return error
    }
  }
)

export const getUser = async (id) => {
  try {
    return await instanceOne.get(name + '/' + id)
  } catch (error) {
    return error
  }
}

export const getProjectsByUser = createAsyncThunk(
  'users/getProjects',
  async (id, { getState }) => {
    try {
      const { token } = getState().auth
      return await instanceOne.get(name + '/' + id + '/projects', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
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

export const loginUser = async ({ username, password }) => {
  try {
    return await instanceOne.post('auth/login', {
      username,
      password,
    })
  } catch (error) {
    return error
  }
}

export const updateRole = createAsyncThunk(
  'users/updateRole',
  async ({ userId, roleId }, { getState }) => {
    try {
      return await instanceOne.put(
        name + '/' + userId + '/updateRole?newRoleId=' + roleId,
        {},
        {
          headers: {
            Authorization: 'Bearer ' + getState().auth.token,
          },
        }
      )
    } catch (error) {
      return error
    }
  }
)

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (id, { getState }) => {
    try {
      return await instanceOne.delete(name + '/' + id, {
        headers: {
          Authorization: 'Bearer ' + getState().auth.token,
        },
      })
    } catch (error) {
      return error
    }
  }
)
