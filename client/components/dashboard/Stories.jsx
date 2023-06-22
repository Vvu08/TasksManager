import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Tasks } from '@/components'

const stories = [
  {
    id: 1,
    title: 'Introduction',
    description: 'This is the introduction',
    startDate: '2021-09-01',
    dueDate: '2021-09-10',
  },
  {
    id: 2,
    title: 'UI Design',
    description: 'This is the UI Design',
    startDate: '2021-09-11',
    dueDate: '2021-09-20',
  },
  {
    id: 3,
    title: 'Functionalities',
    description: 'This is the Functionalities',
    startDate: '2021-09-21',
    dueDate: '2021-09-30',
  },
  {
    id: 4,
    title: 'Review and Feedback',
    description: 'This is the Review and Feedback',
    startDate: '2021-10-01',
    dueDate: '2021-10-10',
  },
]

function Stories() {
  const { query } = useRouter()
  const [visibility, setVisibility] = React.useState(
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
        <button className='text-sm ml-auto text-slate-400 hover:text-slate-300'>
          + Add Story
        </button>
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

      {stories.map((story, index) => (
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
                {story.startDate}
              </p>
              <p className='px-6 py-4 font-medium whitespace-nowrap text-white overflow-hidden'>
                {story.dueDate}
              </p>
            </Link>
            <p
              className='justify-self-end pr-10 uppercase text-xs py-4 text-gray-300 cursor-pointer hover:text-slate-300 overflow-hidden'
              onClick={() => toggleVisibility(index)}
            >
              {visibility[index] ? 'Collapse ⇑' : 'Expand ⇓'}
            </p>
          </div>

          <Tasks visibility={visibility[index]} />
        </>
      ))}
    </section>
  )
}

export default Stories
