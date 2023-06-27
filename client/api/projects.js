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

export const getProject = async (id) => {
  try {
    return await instanceOne.get(name + '/' + id)
  } catch (error) {
    throw error
  }
}

export const getStoriesByProject = async (id) => {
  console.log(id)
  try {
    return await instanceOne.get(name + '/' + id + '/story')
  } catch (error) {
    throw error
  }
}

export const createProject = createAsyncThunk(
  'projects/create',
  async ({ title, status }, { getState }) => {
    try {
      const { username, password } = getState().auth.user
      return await instanceOne.post(
        name,
        {
          title,
          status,
        },
        {
          Authorization: 'Basic ' + btoa('testuser2' + ':' + 'testuser2'),
        }
      )
    } catch (error) {
      throw error
    }
  }
)

export const assignUserToProject = async (userId, projectId) => {
  try {
    return await instanceOne.put(name + '/' + projectId + '/assign/' + userId)
  } catch (error) {
    throw error
  }
}

export const updateProject = async (id, title, status) => {
  try {
    return await instanceOne.put(name + '/' + id + '/update', {
      title,
      status,
    })
  } catch (error) {
    throw error
  }
}

export const deleteProject = async (id) => {
  try {
    return await instanceOne.delete(name + '/' + id + '/delete')
  } catch (error) {
    throw error
  }
}
