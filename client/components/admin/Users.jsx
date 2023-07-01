import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getUsers } from '@/api/users'
import { RemoveUser, SelectRole } from '@/components'

function Users({ users, setUsers }) {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUsers()).then((res) => {
      if (res.payload) res.payload.status === 200 && setUsers(res.payload.data)
    })
  }, [])

  const filteredUsers = users.filter((user) => user.role.id !== 2)

  return filteredUsers.map((user) => (
    <div className='pl-3 grid grid-cols-2 items-end'>
      <div className='mt-1'>
        <h2 className='text-md'>{user.username}</h2>
        <p className='text-xs text-slate-400'>{user.jobTitle}</p>
      </div>
      <div className='flex gap-5'>
        <SelectRole userId={user.id} value={user.role.id} />
        <RemoveUser userId={user.id} setUsers={setUsers} />
      </div>
    </div>
  ))
}

export default Users
