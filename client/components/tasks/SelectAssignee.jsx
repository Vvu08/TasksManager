import React, { useState, useEffect, use } from 'react'
import { useDispatch } from 'react-redux'
import usePopup from '@/hooks/usePopup'
import { getAssignees } from '@/api/projects'
import { assignUserToTask } from '@/api/tasks'
import { useRouter } from 'next/router'
import { getUser } from '@/api/users'

function SelectAssignee({ value, setValue }) {
  const { id, taskId } = useRouter().query
  const { isOpen, toggle } = usePopup('assignee-dropdown')
  const [assignees, setAssignees] = useState([])
  const dispatch = useDispatch()

  const selectAssignee = (selectedValue) => {
    setValue(selectedValue)
    dispatch(assignUserToTask({ taskId, userId: selectedValue.id }))
    toggle()
  }

  useEffect(() => {
    dispatch(getAssignees(id)).then((res) => {
      if (res.payload)
        if (res.payload.status === 200) setAssignees(res.payload.data)
    })
    if (value)
      dispatch(getUser(value)).then((res) => {
        if (res.payload)
          if (res.payload.status === 200) setValue(res.payload.data)
      })
  }, [])

  return (
    <div>
      <div
        className={`flex text-grey-500 gap-1 bg-transparent w-full overflow-hidden resize-none p-2 border-2 border-solid rounded-lg ${'border-slate-500/50 cursor-pointer '}`}
        onClick={toggle}
      >
        {value ? <> {value.username} </> : <>None</>}

        <svg
          className='ml-auto'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M18 9L12 15L6 9' stroke='rgb(100 116 139)' strokeWidth='2' />
        </svg>
      </div>
      {isOpen && (
        <ul className='assignee-dropdown grid mt-1 ml-2 bg-gray-800 rounded-lg absolute'>
          {assignees.map((assignee) => (
            <li
              key={assignee.id}
              className='pl-4 pr-10 py-1 bg-gray-800 hover:bg-gray-700 focus:bg-gray-900 flex gap-1 items-center text-gray-100 rounded-lg cursor-pointer'
              onClick={() => selectAssignee(assignee)}
            >
              {assignee.username}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SelectAssignee
