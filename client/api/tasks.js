import { instanceOne } from './axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
const name = 'task'

export const getTasks = async () => {
  try {
    return await instanceOne.get(name)
  } catch (error) {
    throw error
  }
}

export const getTask = createAsyncThunk(
  'tasks/getTask',
  async (id, { getState }) => {
    try {
      const { token } = getState().auth
      return await instanceOne.get(name + '/' + id, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
    } catch (error) {
      throw error
    }
  }
)

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async ({ storyId, title, description, priority }, { getState }) => {
    try {
      const { token } = getState().auth
      return await instanceOne.post(
        name + '?storyId=' + storyId,
        {
          title,
          description,
          priority,
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

export const assignUserToTask = createAsyncThunk(
  'tasks/assignToTask',
  async (userId, taskId) => {
    try {
      return await instanceOne.post(name + '/' + taskId + '/assign/' + userId)
    } catch (error) {
      throw error
    }
  }
)

export const updateTask = createAsyncThunk(
  'tasks/createTask',
  async ({ id, title, description, priority }, { getState }) => {
    try {
      return await instanceOne.put(
        name + '/' + id,
        {
          title,
          description,
          priority,
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

//OTHER SERVER
export const updateTaskStatus = async (id, statusId) => {
  try {
    return await instanceOne.put(name + '/' + id + '/updateStatus/' + statusId)
  } catch (error) {
    throw error
  }
}

export const deleteTask = async (id) => {
  try {
    return await instanceOne.delete(name + '/' + id + '/delete')
  } catch (error) {
    throw error
  }
}
