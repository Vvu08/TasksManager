import { instanceOne } from './axios'
const name = 'task'

export const getTasks = async () => {
  try {
    return await instanceOne.get(name)
  } catch (error) {
    throw error
  }
}

export const getTask = async (id) => {
  try {
    return await instanceOne.get(name + '/' + id)
  } catch (error) {
    throw error
  }
}

export const createTask = async (storyId, title, description, priority) => {
  try {
    return await instanceOne.post(name + '/create?storyId=' + storyId, {
      title,
      description,
      priority,
    })
  } catch (error) {
    throw error
  }
}

export const assignUserToTask = async (userId, taskId) => {
  try {
    return await instanceOne.post(name + '/' + taskId + '/assign/' + userId)
  } catch (error) {
    throw error
  }
}

export const updateTask = async (id, title, description, priority) => {
  try {
    return await instanceOne.put(name + '/' + id + '/update', {
      title,
      description,
      priority,
    })
  } catch (error) {
    throw error
  }
}

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
