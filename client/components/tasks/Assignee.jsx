import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getUser } from '@/api/users'

function Assignee({ id }) {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  useEffect(() => {
    dispatch(getUser(id)).then((res) => {
      if (res.payload)
        res.payload.status === 200 && setUsername(res.payload.data.username)
    })
  }, [])

  return (
    <p className='px-5 py-2.5 whitespace-nowrap text-white overflow-hidden'>
      {id ? username : 'Unassigned'}
    </p>
  )
}

export default Assignee
