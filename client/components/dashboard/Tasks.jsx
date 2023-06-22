import styles from '@/styles/Tasks.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Priority, SelectPriority, SelectStatus, Status } from '..'

const tasks = [
  {
    id: 1,
    title: 'Introduction',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel libero euismod, ultricies.',
    status: 'Pending',
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
    priority: 2,
  },
  {
    id: 3,
    title: 'Functionaties',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel libero euismod, ultricies.',
    status: 'Done',
    assignee: 'John Doe',
    priority: 1,
  },
  {
    id: 4,
    title: 'Funcs II',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel libero euismod, ultricies.',
    status: 'Done',
    assignee: 'Alex Doe',
    priority: 3,
  },
]

function Tasks({ visibility }) {
  const { query } = useRouter()
  const [status, setStatus] = useState(null)
  const [priority, setPriority] = useState(null)
  const [assignee, setAssignee] = useState(null)

  const filteredTasks = tasks.filter((task) => {
    if (priority && task.priority !== priority) {
      return false
    }
    if (status && task.status !== status) {
      return false
    }
    return true
  })

  return (
    <div className={`${visibility ? styles.tasks.open : styles.tasks}`}>
      <div className='overflow-x-hidden text-left pl-3 text-gray-400'>
        <div className='flex gap-3 m-2 bg-zinc-900 justify-end'>
          <SelectStatus
            value={status}
            setValue={setStatus}
            disabled={false}
            isFilter={true}
          />
          <SelectPriority
            value={priority}
            setValue={setPriority}
            disabled={false}
            isFilter={true}
          />
          <p className='px-5 py-2'>Assignee</p>
        </div>
        <div className='grid grid-cols-5 bg-zinc-950'>
          <p className='px-5 py-2'>Title</p>
          <p className='px-5 py-2'>Description</p>
          <p className='px-5 py-2'>Status</p>
          <p className='px-5 py-2'>Assignee</p>
          <p className='px-5 py-2'>Priority</p>
        </div>
        {filteredTasks.map((task) => (
          <Link href={`/projects/${query.id}/tasks/${task.id}`}>
            <div
              key={task.id}
              className='grid grid-cols-5 border-b border-zinc-800 bg-zinc-900 hover:bg-zinc-800'
            >
              <p className='px-5 py-2.5 font-medium whitespace-nowrap text-white overflow-hidden'>
                {task.title}
              </p>
              <p className='px-5 py-2.5 whitespace-nowrap text-white overflow-hidden'>
                {task.description}
              </p>
              <p className='px-5 py-2.5 whitespace-nowrap text-white overflow-hidden'>
                <Status status={task.status} />
              </p>
              <p className='px-5 py-2.5 whitespace-nowrap text-white overflow-hidden'>
                {task.assignee}
              </p>
              <Priority priority={task.priority} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Tasks
