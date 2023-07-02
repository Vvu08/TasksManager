import { useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../layouts/AdminLayout'
import { UserForm, Users } from '@/components'

export default function Admin() {
  const [users, setUsers] = useState([])
  const router = useRouter()

  const handleLogout = () => {
    localStorage.clear()
    router.push('/auth/login')
  }

  return (
    <Layout keywords={'main page'}>
      <article className='px-10 py-5'>
        <div className='flex gap-3 items-end'>
          <h1>ADMIN PAGE</h1>
          <p
            onClick={handleLogout}
            className='text-sm text-blue-300 cursor-pointer'
          >
            Exit
          </p>
        </div>
        <p className='text-sm text-slate-400'>
          This page is only accessible by admin users.
        </p>

        <div className='mx-1 my-2 bg-neutral-800 rounded-md p-3'>
          <div>
            <h2 className='font-semibold'>Users</h2>
            <p className='text-sm text-slate-400'>
              Add or remove users of site. Change their roles.
            </p>
            <Users users={users} setUsers={setUsers} />
          </div>
        </div>
        <UserForm setUsers={setUsers} />
      </article>
    </Layout>
  )
}
