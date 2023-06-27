import { instanceOne } from './axios'
const name = 'story'

export const getStories = async () => {
  try {
    return await instanceOne.get(name)
  } catch (error) {
    throw error
  }
}

export const getStory = async (id) => {
  try {
    return await instanceOne.get(name + '/' + id)
  } catch (error) {
    throw error
  }
}

export const getTasksByStory = async (id) => {
  try {
    return await instanceOne.get(name + '/' + id + '/task')
  } catch (error) {
    throw error
  }
}

export const createStory = async (
  title,
  description,
  endDate,
  startDate,
  projectId
) => {
  try {
    return await instanceOne.post(name + '/create?projectId=' + projectId, {
      title,
      description,
      endDate,
      startDate,
    })
  } catch (error) {
    throw error
  }
}

export const updateStory = async (
  id,
  title,
  description,
  endDate,
  startDate
) => {
  try {
    return await instanceOne.put(name + '/' + id + '/update', {
      title,
      description,
      endDate,
      startDate,
    })
  } catch (error) {
    throw error
  }
}

export const deleteStory = async (id) => {
  try {
    return await instanceOne.delete(name + '/' + id + '/delete')
  } catch (error) {
    throw error
  }
}
