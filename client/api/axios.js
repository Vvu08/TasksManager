import axios from 'axios'

export const instanceOne = axios.create({
  baseURL: process.env.NEXT_PUBLIC_JAVA_SERVER_API,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const instanceTwo = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CSHARP_SERVER_API,
  headers: {
    'Content-Type': 'application/json',
  },
})
