import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getUser } from '@/api/users'

function Creator({ creatorId }) {
  const [username, setUsername] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUser(creatorId)).then((res) => {
      if (res.payload) setUsername(res.payload.data.username)
    })
  }, [])

  return <p className='pl-3'>{username}</p>
}

export default Creator
