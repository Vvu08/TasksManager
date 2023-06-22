import { SmallPriority } from '..'

function Task({ task }) {
  return (
    <section className='overflow-hidden'>
      <div className='grid grid-cols-2 mt-1 mb-3 bg-zinc-700 rounded-md p-4'>
        <p className='font-medium whitespace-nowrap  text-white overflow-hidden'>
          {task.title}
        </p>
        <SmallPriority priority={task.priority} />
        <p className='font-medium whitespace-nowrap text-sm text-white'>
          Assigned to <span className='text-sky-500'>{task.assignee}</span>
        </p>
      </div>
    </section>
  )
}

export default Task
