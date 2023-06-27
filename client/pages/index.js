import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Statistic, StatusColor, Hero } from '@/components'
import Layout from '../layouts'
import { getProjectsByUser } from '@/api/users'
import { wrapper } from '@/redux/store'

export default function Home({ projects }) {
  const { role } = useSelector((s) => s.auth)
  const [type, setType] = useState('doughnut')
  const chartData = {
    labels: ['Tasks Done', 'In Progress', 'Tasks to Do', 'Tasks to Review'],
    values: [30, 3, 25, 5],
  }
  const router = useRouter()

  useEffect(() => {
    !role && router.push('/auth/login')
  }, [role])

  return (
    <Layout keywords={'main page'}>
      <article className='px-10 py-5'>
        <section className='grid lg:grid-cols-2 md:grid-cols-1'>
          <Hero />
          <Statistic data={chartData} type={type} />
        </section>
        <h1 className='text-xl'>Your projects, {role}</h1>
        <section className='grid gap-6 lg:grid-cols-5 md:grid-cols-3 m-3'>
          {projects.map((project) => (
            <Link href={`/projects/${project.id}`} key={project.id}>
              <div className='bg-zinc-900 hover:bg-zinc-800 flex transition ease-in-out'>
                <StatusColor status={project.status} />
                <div className='p-5'>
                  <h2>{project.title}</h2>
                  <p className='text-sm text-gray-400'>{project.status}</p>
                </div>
              </div>
            </Link>
          ))}
        </section>
      </article>
    </Layout>
  )
}

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  await store.dispatch(getProjectsByUser(1))
  const projects = store.getState().projects.projects
  return {
    props: {
      projects,
    },
  }
})
