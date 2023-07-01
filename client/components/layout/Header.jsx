import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ProjectForm } from '@/components'
import { useSelector } from 'react-redux'

function Header() {
  const [open, setOpen] = React.useState(false)
  const user = useSelector((state) => state.auth.user)
  const router = useRouter()

  const handleLogout = () => {
    localStorage.clear()
    router.push('/auth/login')
  }

  return (
    <header className='bg-zinc-900 pt-3'>
      <ul className='grid grid-cols-2 py-4 px-10 font-medium text-slate-200 items-center'>
        <li className='text-lg '>Tasks Management </li>
        <li className='flex items-center ml-auto pr-10 '>
          <Link
            href={'/'}
            className=' font-semibold mr-8 text-slate-400 hover:text-slate-300'
          >
            Projects
          </Link>
          <p
            onClick={handleLogout}
            className=' font-semibold mr-8 text-slate-400  hover:text-slate-300 cursor-pointer'
          >
            Exit
          </p>
          {user?.role?.id === 3 && (
            <button
              onClick={() => setOpen(!open)}
              className='whitespace-nowrap bg-slate-400 hover:bg-slate-300 text-slate-900 font-semibold text-sm py-2 px-4 rounded '
            >
              + Project
            </button>
          )}
        </li>
      </ul>
      <ProjectForm open={open} setOpen={setOpen} />
    </header>
  )
}

export default Header
