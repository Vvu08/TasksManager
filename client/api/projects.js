import { createAsyncThunk } from '@reduxjs/toolkit'
import { instanceOne } from './axios'
const name = 'project'

export const getProjects = async () => {
  try {
    return await instanceOne.get(name)
  } catch (error) {
    throw error
  }
}

export const getProject = createAsyncThunk(
  'projects/getProject',
  async (id, { getState }) => {
    try {
      return await instanceOne.get(name + '/' + id, {
        headers: {
          Authorization: 'Bearer ' + getState().auth.token,
        },
      })
    } catch (error) {
      throw error
    }
  }
)

export const getStoriesByProject = createAsyncThunk(
  'projects/storiesByProject',
  async (id, { getState }) => {
    try {
      const { token } = getState().auth
      return await instanceOne.get(name + '/' + id + '/story', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
    } catch (error) {
      throw error
    }
  }
)

export const createProject = createAsyncThunk(
  'projects/create',
  async ({ title, status }, { getState }) => {
    try {
      const { token } = getState().auth
      return await instanceOne.post(
        name,
        {
          title,
          status,
        },
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      )
    } catch (error) {
      throw error
    }
  }
)

export const assignUserToProject = createAsyncThunk(
  'projects/assignToProject',
  async ({ userId, projectId }, { getState }) => {
    try {
      return await instanceOne.post(
        name + '/' + projectId + '/assign/' + userId,
        {},
        {
          headers: {
            Authorization: 'Bearer ' + getState().auth.token,
          },
        }
      )
    } catch (error) {
      throw error
    }
  }
)

export const updateProject = createAsyncThunk(
  'projects/create',
  async ({ id, title, status }, { getState }) => {
    try {
      return await instanceOne.put(
        name + '/' + id,
        {
          title,
          status,
        },
        {
          headers: {
            Authorization: 'Bearer ' + getState().auth.token,
          },
        }
      )
    } catch (error) {
      throw error
    }
  }
)

export const deleteProject = async (id) => {
  try {
    return await instanceOne.delete(name + '/' + id + '/delete')
  } catch (error) {
    throw error
  }
}
