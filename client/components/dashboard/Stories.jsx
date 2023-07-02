import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { getStoriesByProject } from '@/api/projects'
import { Tasks, StoryForm } from '@/components'
import { setDateToDisplay } from '@/utils/setDate'

function Stories() {
  const { query } = useRouter()
  const [open, setOpen] = useState(false)
  const [stories, setStories] = useState([])
  const { id: roleId } = useSelector((state) => state.auth.user.role)
  const dispatch = useDispatch()

  //stories MUST BE IN ARRAY
  useEffect(() => {
    dispatch(getStoriesByProject(Number(query.id))).then((res) => {
      if (res.payload)
        if (res.payload.status === 200) setStories(res.payload.data)
    })
  }, [])

  const [visibility, setVisibility] = useState(
    Array(stories.length).fill(false)
  )
  const toggleVisibility = (index) => {
    const newVisibility = [...visibility]
    newVisibility[index] = !newVisibility[index]
    setVisibility(newVisibility)
  }

  return (
    <section className='mx-3 p-5 border-solid border-2 border-zinc-800 bg-zinc-900 rounded-md'>
      <div className='flex'>
        <h1 className='text-lg'>Stories</h1>
        {roleId === 3 && (
          <button
            onClick={() => setOpen(!open)}
            className='text-sm ml-auto text-slate-400 hover:text-slate-300'
          >
            + Add Story
          </button>
        )}
      </div>
      <div className='grid grid-cols-5 w-full shadow-md sm:rounded-lg mt-2'>
        <h2 scope='col' className='px-6 py-3 bg-stone-900'>
          Story Title
        </h2>
        <h2 scope='col' className='px-6 py-3 bg-stone-900'>
          Description
        </h2>
        <h2 scope='col' className='px-6 py-3 bg-stone-900'>
          Start Date
        </h2>
        <h2 scope='col' className='px-6 py-3 bg-stone-900'>
          Due Date
        </h2>
        <h2 scope='col' className='px-6 py-3 bg-stone-900'></h2>
      </div>

      {stories.length > 0 &&
        stories.map((story, index) => (
          <>
            <div
              key={story.id}
              className='grid grid-cols-5 border-b border-zinc-700 bg-zinc-800 hover:bg-zinc-700'
            >
              <Link
                href={`/projects/${query.id}/stories/${story.id}`}
                className='grid col-span-4 grid-cols-4'
              >
                <p className='px-6 py-4 font-medium whitespace-nowrap text-white overflow-hidden'>
                  {story.title}
                </p>
                <p className='px-6 py-4 font-medium whitespace-nowrap text-white overflow-hidden'>
                  {story.description}
                </p>
                <p className='px-6 py-4 font-medium whitespace-nowrap text-white overflow-hidden'>
                  {setDateToDisplay(new Date(story.startDate))}
                </p>
                <p className='px-6 py-4 font-medium whitespace-nowrap text-white overflow-hidden'>
                  {setDateToDisplay(new Date(story.endDate))}
                </p>
              </Link>
              <p
                className='justify-self-end pr-10 uppercase text-xs py-4 text-gray-300 cursor-pointer hover:text-slate-300 overflow-hidden'
                onClick={() => toggleVisibility(index)}
              >
                {visibility[index] ? 'Collapse ⇑' : 'Expand ⇓'}
              </p>
            </div>

            <Tasks visibility={visibility[index]} storyId={story.id} />
          </>
        ))}
      <StoryForm open={open} setOpen={setOpen} setStories={setStories} />
    </section>
  )
}

export default Stories
