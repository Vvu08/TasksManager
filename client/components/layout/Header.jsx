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
            className='flex items-center gap-1 font-semibold mr-8 text-slate-400 hover:text-slate-300'
          >
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 26'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M5 14.0585C5 13.0494 5 12.5448 5.22166 12.1141C5.44333 11.6833 5.8539 11.3901 6.67505 10.8035L10.8375 7.83034C11.3989 7.42938 11.6795 7.2289 12 7.2289C12.3205 7.2289 12.6011 7.42938 13.1625 7.83034L17.325 10.8035C18.1461 11.3901 18.5567 11.6833 18.7783 12.1141C19 12.5448 19 13.0494 19 14.0585V19C19 19.9428 19 20.4142 18.7071 20.7071C18.4142 21 17.9428 21 17 21H7C6.05719 21 5.58579 21 5.29289 20.7071C5 20.4142 5 19.9428 5 19V14.0585Z'
                fill='#494d54'
                fillOpacity='0.7'
              />
              <path
                d='M3 12.3866C3 12.6535 3 12.7869 3.0841 12.8281C3.16819 12.8692 3.27352 12.7873 3.48418 12.6234L10.7721 6.95502C11.362 6.49625 11.6569 6.26686 12 6.26686C12.3431 6.26686 12.638 6.49625 13.2279 6.95502L20.5158 12.6234C20.7265 12.7873 20.8318 12.8692 20.9159 12.8281C21 12.7869 21 12.6535 21 12.3866V11.9782C21 11.4978 21 11.2576 20.8983 11.0497C20.7966 10.8418 20.607 10.6944 20.2279 10.3995L13.2279 4.95502C12.638 4.49625 12.3431 4.26686 12 4.26686C11.6569 4.26686 11.362 4.49625 10.7721 4.95502L3.77212 10.3995C3.39295 10.6944 3.20337 10.8418 3.10168 11.0497C3 11.2576 3 11.4978 3 11.9782V12.3866Z'
                fill='#8299bf'
              />
              <path
                d='M12.5 15H11.5C10.3954 15 9.5 15.8954 9.5 17V20.85C9.5 20.9328 9.56716 21 9.65 21H14.35C14.4328 21 14.5 20.9328 14.5 20.85V17C14.5 15.8954 13.6046 15 12.5 15Z'
                fill='#8299bf'
              />
              <rect x='16' y='5' width='2' height='4' rx='0.5' fill='#8299bf' />
            </svg>
            Projects
          </Link>
          <p
            onClick={handleLogout}
            className='flex items-center gap-1 font-semibold mr-8 text-slate-400  hover:text-slate-300 cursor-pointer'
          >
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <circle cx='12' cy='15' r='5' fill='#494d54' fillOpacity='0.7' />
              <path
                d='M6.34315 6.34315C5.22433 7.46197 4.4624 8.88743 4.15372 10.4393C3.84504 11.9911 4.00346 13.5997 4.60896 15.0615C5.21447 16.5233 6.23985 17.7727 7.55544 18.6518C8.87103 19.5308 10.4178 20 12 20C13.5823 20 15.129 19.5308 16.4446 18.6518C17.7602 17.7727 18.7855 16.5233 19.391 15.0615C19.9965 13.5997 20.155 11.9911 19.8463 10.4393C19.5376 8.88743 18.7757 7.46197 17.6569 6.34315'
                stroke='#8299bf'
                strokeWidth='1.2'
                strokeLinecap='round'
              />
              <path
                d='M12 8L12 4'
                stroke='#8299bf'
                strokeWidth='1.2'
                strokeLinecap='round'
              />
            </svg>
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
