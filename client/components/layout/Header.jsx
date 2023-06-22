import React from 'react'
import Link from 'next/link'
import { ProjectForm } from '@/components'

function Header() {
  const [open, setOpen] = React.useState(false)
  return (
    <header className='bg-zinc-900 pt-3'>
      <ul className='grid grid-cols-2 py-4 px-10 font-medium text-slate-200 items-center'>
        <li className='text-lg '>Tasks Management </li>
        <li className='ml-auto pr-10 '>
          <Link
            href={'/'}
            className=' font-semibold mr-8 text-slate-400 hover:text-slate-300'
          >
            Projects
          </Link>
          <span className='font-semibold mr-8 text-slate-400  hover:text-slate-300'>
            Messages
          </span>

          <button
            onClick={() => setOpen(!open)}
            className='bg-slate-400 hover:bg-slate-300 text-slate-900 font-semibold py-2 px-4 rounded '
          >
            Create Project
          </button>
        </li>
      </ul>
      <ProjectForm open={open} setOpen={setOpen} />
    </header>
  )
}

export default Header
