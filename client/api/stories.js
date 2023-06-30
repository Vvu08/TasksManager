import { instanceOne } from './axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
const name = 'story'

export const getStories = async () => {
  try {
    return await instanceOne.get(name)
  } catch (error) {
    throw error
  }
}

export const getStory = createAsyncThunk(
  'stories/getStory',
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

export const getTasksByStory = createAsyncThunk(
  'stories/getTasksByStory',
  async (id, { getState }) => {
    try {
      const { token } = getState().auth
      return await instanceOne.get(name + '/' + id + '/task', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
    } catch (error) {
      throw error
    }
  }
)

export const createStory = createAsyncThunk(
  'stories/createStory',
  async (
    { title, description, endDate, startDate, projectId },
    { getState }
  ) => {
    try {
      const token = getState().auth.token
      return await instanceOne.post(
        name + '?projectId=' + projectId,
        {
          title,
          description,
          endDate,
          startDate,
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

export const updateStory = createAsyncThunk(
  'stories/updateStory',
  async ({ id, title, description, endDate, startDate }, { getState }) => {
    try {
      const { token } = getState().auth
      return await instanceOne.put(
        name + '/' + id,
        {
          title,
          description,
          endDate,
          startDate,
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

export const deleteStory = async (id) => {
  try {
    return await instanceOne.delete(name + '/' + id + '/delete')
  } catch (error) {
    throw error
  }
}
