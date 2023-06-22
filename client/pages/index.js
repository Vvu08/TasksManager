import { Inter } from 'next/font/google'
import { useState } from 'react'
import Link from 'next/link'
import Layout from '../layouts'
import { useSelector } from 'react-redux'
import { Statistic, StatusColor } from '@/components'

const inter = Inter({ subsets: ['latin'] })

const projects = [
  {
    id: 1,
    title: 'Project 1',
    status: 'Active',
  },
  {
    id: 2,
    title: 'Project 2',
    status: 'Inactive',
  },
  {
    id: 3,
    title: 'Project 3',
    status: 'Canceled',
  },
  {
    id: 4,
    title: 'Project 4',
    status: 'Draw',
  },
]

export default function Home() {
  const { role } = useSelector((s) => s.auth)
  const [type, setType] = useState('doughnut')
  const chartData = {
    labels: ['Tasks Done', 'In Progress', 'Tasks to Do', 'Tasks to Review'],
    values: [30, 3, 25, 5],
  }

  return (
    <Layout keywords={'main page'}>
      <article className='px-10 py-5'>
        <h1 className='text-xl'>Your statistic</h1>
        <Statistic data={chartData} type={type} />
        <h1 className='text-xl'>Your projects, {role}</h1>
        <section className='grid gap-6 lg:grid-cols-5 md:grid-cols-3 m-3'>
          {projects.map((project) => (
            <Link href={`/projects/${project.id}`} key={project.id}>
              <div className='bg-zinc-900 hover:bg-zinc-800 flex transition ease-in-out'>
                <div className='p-5'>
                  <StatusColor status={project.status} />
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
