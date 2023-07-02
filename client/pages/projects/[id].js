import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import ProjectLayout from '@/layouts/ProjectLayout'
import { ProjectStatistics, Stories } from '@/components'
import { getProject, getAssignees } from '@/api/projects'

function Project() {
  const { id } = useRouter().query
  const [project, setProject] = useState({})
  const [userCount, setUserCount] = useState(0)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProject(id)).then((res) => {
      res.payload.status === 200 && setProject(res.payload.data)
    })
    dispatch(getAssignees(id)).then((res) => {
      res.payload.status === 200 && setUserCount(res.payload.data.length)
    })
  }, [])

  return (
    <ProjectLayout>
      <section className='m-3 px-10'>
        <p className='mb-3 text-slate-400'>
          Projects / <span className='text-slate-200'>{project.title}</span>
        </p>
        <div className='flex gap-4 items-end'>
          <h1 className='text-xl font-bold'>{project.title}</h1>
          <p className='text-slate-400 text-sm'>{userCount} assignees</p>
        </div>
        <ProjectStatistics />
        <Stories />
      </section>
    </ProjectLayout>
  )
}

export default Project
