import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getProjectsByUser } from '@/api/users'
import { Statistic, StatusColor, Hero } from '@/components'
import Layout from '../layouts'

export default function Home() {
  const user = useSelector((state) => state.auth.user)
  const projects = useSelector((state) => state.projects.projects)
  const chartData = {
    labels: ['Tasks Done', 'In Progress', 'Tasks to Do', 'Tasks to Review'],
    values: [30, 3, 25, 5],
  }
  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    user.length === 0 && router.push('/auth/login')
    user?.role?.id === 2 && router.push('/admin')
  }, [user])

  useEffect(() => {
    dispatch(getProjectsByUser(user.id))
  }, [])

  return (
    <Layout keywords={'main page'}>
      <article className='px-10 py-5'>
        <section className='grid lg:grid-cols-2 md:grid-cols-1'>
          <Hero />
          <Statistic data={chartData} />
        </section>
        <h1 className='text-xl mt-5 ml-5'>Your projects</h1>
        {projects.length > 0 ? (
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
        ) : (
          <p className='text-slate-400 mt-5 ml-7'>
            You have no project. Click '+ Project' to start your first work
          </p>
        )}
      </article>
    </Layout>
  )
}

/* export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  const { dispatch, getState } = store
  await dispatch(getProjectsByUser({ id: 2 }))
  const projects = getState().projects.projects

  return {
    props: {
      projects,
    },
  }
}) */
