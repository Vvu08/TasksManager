import { useState } from 'react'
import ProjectLayout from '@/layouts/ProjectLayout'
import { Textarea, Input, DatesPicker, Tasks } from '@/components'

const story = {
  id: 1,
  title: 'Introduction',
  description: 'This is the introduction',
  startDate: '2021-09-01',
  dueDate: '2021-09-10',
}

function Story() {
  const [title, setTitle] = useState(story.title)
  const [description, setDescription] = useState(story.description)
  const [startDate, setStartDate] = useState(story.startDate)
  const [dueDate, setDueDate] = useState(story.dueDate)
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
            <div className='pl-2 grid grid-cols-2 gap-2 mb-2 items-center'>
              <h3 className='text-slate-300'>Start Date</h3>
              <DatesPicker setValue={setStartDate} disabled={disabled} />
            </div>
            <div className='pl-2 grid grid-cols-2 gap-2 mb-2 items-center'>
              <h3 className='text-slate-300'>End Date</h3>
              <DatesPicker setValue={setDueDate} disabled={disabled} />
            </div>
          </section>
        </div>
        <h2 className='text-lg mb-2'>Tasks</h2>
        <Tasks visibility={true} />
      </section>
    </ProjectLayout>
  )
}

export default Story
