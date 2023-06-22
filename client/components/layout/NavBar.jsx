import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '@/styles/NavBar.module.css'

function NavBar() {
  const { query } = useRouter()
  return (
    <ul className={`${styles.navbar} pt-8 bg-neutral-900 pr-10`}>
      <Link href={`/projects/${query.id}`}>
        <li className='py-4 px-10  hover:bg-neutral-800'>Dashboard</li>
      </Link>
      <Link href={`/projects/${query.id}/tracker`}>
        <li className='py-4 px-10 hover:bg-neutral-800'>Tracker</li>
      </Link>
      <Link href={`/projects/${query.id}/settings`}>
        <li className='py-4 px-10 hover:bg-neutral-800'>Settings</li>
      </Link>
      <li className='absolute bottom-0 px-10 pb-10'>Username</li>
    </ul>
  )
}

export default NavBar
