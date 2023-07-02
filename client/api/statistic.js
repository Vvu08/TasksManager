import { instanceTwo } from './axios'
const name = 'statistic'

export const getProjectTasks = async (projectId) => {
  try {
    return await instanceTwo.get(name + '/projectTasks', {
      params: {
        projectId,
      },
    })
  } catch (error) {
    throw error
  }
}

export const getTaskStatistics = async (projectId) => {
  try {
    return await instanceTwo.get(name + '/allProjectTask', {
      params: {
        projectId,
      },
    })
  } catch (error) {
    throw error
  }
}

export const getUserStatistics = async (userId) => {
  try {
    return await instanceTwo.get(name + '/allUserProjectTask', {
      params: {
        userId,
      },
    })
  } catch (error) {
    throw error
  }
}
