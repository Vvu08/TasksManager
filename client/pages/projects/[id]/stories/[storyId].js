import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { getStory } from '@/api/stories'
import { updateStory } from '@/api/stories'
import ProjectLayout from '@/layouts/ProjectLayout'
import { Textarea, Input, DatesPicker, Tasks } from '@/components'
import { setDateToSend } from '@/utils/setDate'

function Story() {
  const { query } = useRouter()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [id, setId] = useState(undefined)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [startDate, setStartDate] = useState(undefined)
  const [endDate, setEndDate] = useState(undefined)
  const [disabled, setDisabled] = useState(true)
  const dispatch = useDispatch()

  const handleEdit = () => {
    setDisabled(!disabled)
    !disabled &&
      dispatch(
        updateStory({
          id: id,
          title,
          description,
          startDate: setDateToSend(startDate),
          endDate: setDateToSend(endDate),
        })
      )
  }

  useEffect(() => {
    dispatch(getStory(query.storyId)).then((res) => {
      if (res.payload) {
        if (res.payload.status === 200) {
          setId(res.payload.data.id)
          setTitle(res.payload.data.title)
          setDescription(res.payload.data.description)
          setStartDate(res.payload.data.startDate)
          setEndDate(res.payload.data.endDate)
        }
        setLoading(false)
      }
    })
  }, [query.storyId])

  return (
    <ProjectLayout>
      {!loading ? (
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
                <DatesPicker
                  value={startDate}
                  setValue={setStartDate}
                  disabled={disabled}
                />
              </div>
              <div className='pl-2 grid grid-cols-2 gap-2 mb-2 items-center'>
                <h3 className='text-slate-300'>End Date</h3>
                <DatesPicker
                  value={endDate}
                  setValue={setEndDate}
                  disabled={disabled}
                />
              </div>
            </section>
          </div>
          <h2 className='text-lg mb-2'>Tasks</h2>
          <button
            onClick={() => setOpen(!open)}
            className='text-sm ml-auto text-slate-400 hover:text-slate-300'
          >
            + Add Task
          </button>
          <Tasks
            visibility={true}
            storyId={query.storyId}
            open={open}
            setOpen={setOpen}
          />
        </section>
      ) : (
        <h1>Loading</h1>
      )}
    </ProjectLayout>
  )
}

export default Story
