import { useRouter } from 'next/router'
import ProjectLayout from '@/layouts/ProjectLayout'
import { ProjectStatistics, Stories } from '@/components'
import { getStoriesByProject } from '@/api/projects'

const project = {
  title: 'Fullstack Website',
}

function Project({ stories }) {
  return (
    <ProjectLayout>
      <section className='m-3 px-10'>
        <p className='mb-3 text-slate-400'>
          Projects / <span className='text-slate-200'>{project.title}</span>
        </p>
        <div className='flex gap-4 items-end'>
          <h1 className='text-xl font-bold'>{project.title}</h1>
          <p className='text-slate-400 text-sm'>3 assignees</p>
        </div>
        <ProjectStatistics />
        <Stories stories={stories} />
      </section>
    </ProjectLayout>
  )
}

export default Project

export async function getServerSideProps(context) {
  const { id } = context.query
  const stories = (await getStoriesByProject(id)).data
  return {
    props: { stories },
  }
}
