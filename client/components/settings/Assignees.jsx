import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { RemoveUser, SelectRole } from '..'
import { getAssignees } from '@/api/projects'

function Assignees({ assignees, setAssignees }) {
  const { id } = useRouter().query

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAssignees(id)).then((res) => {
      if (res.payload)
        if (res.payload.status === 200) setAssignees(res.payload.data)
    })
  }, [])

  return (
    <div className='grid grid-cols-2'>
      {assignees.map((assignee) => (
        <div className='pl-3 grid grid-cols-2 items-end'>
          <div className='mt-1'>
            <h2 className='text-md'>{assignee.username}</h2>
            <p className='text-xs text-slate-400'>{assignee.jobTitle}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Assignees
