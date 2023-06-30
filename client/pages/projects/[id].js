import ProjectLayout from '@/layouts/ProjectLayout'
import { ProjectStatistics, Stories } from '@/components'

const project = {
  title: 'Fullstack Website',
}

function Project() {
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
        <Stories />
      </section>
    </ProjectLayout>
  )
}

export default Project

/* export async function getServerSideProps(context) {
  const { id } = context.query
  console.log('PROJECT ID', id)
  try {
    const res = await getStoriesByProject(id)
    const stories = res.data
    console.log('RESPONSE', res)
    console.log('STORIES', stories)
    return {
      props: { stories },
    }
  } catch (error) {
    console.error('Error fetching stories:', error)
    return {
      props: { stories: null }, // or handle the error in a different way
    }
  }
} */
