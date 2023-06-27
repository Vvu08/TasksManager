import { instanceOne } from './axios'
const name = 'status'

export const getStatuses = async () => {
  try {
    return await instanceOne.get(name)
  } catch (error) {
    throw error
  }
}
