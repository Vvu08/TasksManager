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
  async ({ taskId, userId }, { getState }) => {
    try {
      return await instanceOne.post(
        name + '/' + taskId + '/assign/' + userId,
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

export const updateTaskStatus = createAsyncThunk(
  'tasks/updateTaskStatus',
  async ({ taskId, statusId }, { getState }) => {
    try {
      return await instanceOne.put(
        name + '/' + taskId + '/updateStatus/' + statusId,
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
