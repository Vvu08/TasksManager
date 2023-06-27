import { instanceOne } from './axios'
const name = 'role'

getRoles = async () => {
  try {
    return await instanceOne.get(name)
  } catch (error) {
    throw error
  }
}
