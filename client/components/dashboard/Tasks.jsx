import styles from '@/styles/Tasks.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
  Assignee,
  Priority,
  SelectPriority,
  SelectStatus,
  Status,
  TaskForm,
} from '..'
import { getTasksByStory } from '@/api/stories'

function Tasks({ visibility, storyId, open, setOpen }) {
  const { query } = useRouter()
  const [tasks, setTasks] = useState([])
  const [status, setStatus] = useState(null)
  const [priority, setPriority] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTasksByStory(storyId)).then((res) => {
      if (res.payload)
        if (res.payload.status === 200) {
          setTasks(res.payload.data)
        }
    })
  }, [tasks])

  const filteredTasks = tasks.filter((task) => {
    if (priority && task.priority !== priority) {
      console.log(task.priority, priority)
      return false
    }
    if (status && task.status.id !== status.id) {
      return false
    }
    return true
  })

  return (
    <div className={`${visibility ? styles.tasks.open : styles.tasks}`}>
      {tasks.length > 0 ? (
        <div className='overflow-x-hidden text-left pl-3 text-gray-400'>
          <div className='flex gap-3 my-2 bg-zinc-900 justify-end'>
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
                <Assignee id={task.assignedUserId} />
                <Priority priority={task.priority} />
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center h-full'>
          <p className='text-lg font-medium text-gray-400'>No tasks</p>
        </div>
      )}
      <TaskForm open={open} setOpen={setOpen} setTasks={setTasks} />
    </div>
  )
}

export default Tasks
