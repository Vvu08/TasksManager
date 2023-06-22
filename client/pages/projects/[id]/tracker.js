import ProjectLayout from '@/layouts/ProjectLayout'
import { Task } from '@/components'

const tasks = [
  {
    id: 1,
    title: 'Introduction',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel libero euismod, ultricies.',
    status: 'In Progress',
    assignee: 'John Doe',
    priority: 5,
  },
  {
    id: 2,
    title: 'UI Design',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel libero euismod, ultricies.',
    status: 'In Progress',
    assignee: 'John Doe',
    priority: 4,
  },
  {
    id: 3,
    title: 'Functionaties',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel libero euismod, ultricies.',
    status: 'In Progress',
    assignee: 'John Doe',
    priority: 2,
  },
]

function Tracker() {
  return (
    <ProjectLayout>
      <section className='m-3 px-10'>
        <div className='flex gap-4 items-end mb-4'>
          <h1 className='text-xl font-bold'>Tasks</h1>
          <button className='text-sm text-slate-400 hover:text-slate-300'>
            + Create Task
          </button>
        </div>
        <div className='grid grid-cols-4 gap-5 '>
          <div className='rounded-md shadow-md p-4 bg-neutral-800'>
            <h2 className='font-bold'>To Do</h2>
            <p className='text-sm text-slate-400'>5 tasks</p>
            <div className='status-col'>
              {tasks.map((task) => (
                <Task task={task} />
              ))}
            </div>
          </div>
          <div className='rounded-md shadow-md p-4 bg-neutral-800'>
            <h2 className='font-bold'>In progress</h2>
            <p className='text-sm text-slate-400'>3 tasks</p>
          </div>
          <div className='rounded-md shadow-md p-4 bg-neutral-800'>
            <h2 className='font-bold'>Pending</h2>
            <p className='text-sm text-slate-400'>0 tasks</p>
          </div>
          <div className='rounded-md shadow-md p-4 bg-neutral-800'>
            <h2 className='font-bold'>Done</h2>
            <p className='text-sm text-slate-400'>7 tasks</p>
          </div>
        </div>
      </section>
    </ProjectLayout>
  )
}

export default Tracker
