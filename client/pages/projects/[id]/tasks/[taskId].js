import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import ProjectLayout from '@/layouts/ProjectLayout'
import { Textarea, Input, SelectPriority, SelectStatus } from '@/components'

const task = {
  title: 'Create a new project',
  description: 'Create a new project with the following features: ...',
  assignee: 'John Doe',
  status: 'In Progress',
  priority: 5,
}

function Task() {
  const { query } = useRouter()
  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description)
  const [priority, setPriority] = useState(task.priority)
  const [status, setStatus] = useState(task.status)
  const [assignee, setAssignee] = useState(task.assignee)
  const [disabled, setDisabled] = useState(true)

  const handleEdit = () => setDisabled(!disabled)

  return (
    <ProjectLayout>
      <section className='m-3 px-10'>
        <div className='flex gap-4 items-center mb-3'>
          <Input value={title} setValue={setTitle} disabled={disabled} />
          <button className='text-slate-400 text-sm' onClick={handleEdit}>
            {disabled ? 'Edit' : 'Save'}
          </button>
        </div>
        <h2 className='text-lg mb-2'>Details</h2>
        <div className='grid lg:grid-cols-2 gap-4 md:grid-cols-1'>
          <section>
            <div className='pl-2 grid grid-cols-2 gap-2 mb-2'>
              <h3 className='text-slate-300'>Description</h3>
              <Textarea
                value={description}
                setValue={setDescription}
                disabled={disabled}
              />
            </div>
          </section>
          <section>
            <div className='pl-2 grid grid-cols-2 gap-2 mb-2'>
              <h3 className='text-slate-300'>Priority</h3>
              <SelectPriority
                value={priority}
                setValue={setPriority}
                disabled={disabled}
              />
            </div>
            <div className='pl-2 grid grid-cols-2 gap-2 mb-2'>
              <h3 className='text-slate-300'>Status</h3>
              <SelectStatus
                value={status}
                setValue={setStatus}
                disabled={disabled}
              />
            </div>
          </section>
          <section>
            <h2 className='text-lg mb-2'>People</h2>
            <div className='pl-2 grid grid-cols-2 gap-2 mb-2'>
              <h3 className='text-slate-300'>Assignee</h3>
              <Textarea
                value={assignee}
                setValue={setAssignee}
                disabled={disabled}
              />
            </div>
            <h2 className='text-lg mb-2'>Story</h2>
            <div className='pl-2 mb-2'>
              <h3 className='text-slate-300'>
                Connected to Story{' '}
                <Link href={`/projects/${query.id}`}>
                  <span className='text-sky-500'>`Story Title`</span>
                </Link>
              </h3>
            </div>
          </section>
        </div>
      </section>
    </ProjectLayout>
  )
}

export default Task
