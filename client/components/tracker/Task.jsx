import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { SmallPriority } from '..'
import { getUser } from '@/api/users'

function Task({ item }) {
  const [username, setUsername] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUser(item.task.userId)).then((res) => {
      res.payload.status === 200 && setUsername(res.payload.data.username)
    })
  }, [])

  return (
    <section className='overflow-hidden'>
      <div className='grid grid-cols-2 mt-1 mb-3 bg-zinc-700 rounded-md p-4'>
        <p className='font-medium whitespace-nowrap  text-white overflow-hidden'>
          {item.task.title}
        </p>
        <SmallPriority priority={item.task.priority} />
        <p className='font-medium whitespace-nowrap text-sm text-white'>
          Assigned to{' '}
          <span className='text-sky-500'>{username || 'nobody'}</span>
        </p>
      </div>
    </section>
  )
}

export default Task
