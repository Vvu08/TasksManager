import { getTaskStatistics } from '@/api/statistic'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

function Statistics() {
  const { id } = useRouter().query
  const [loading, setLoading] = useState(true)
  const [todos, setTodos] = useState(0)
  const [inProgress, setInProgress] = useState(0)
  const [dones, setDones] = useState(0)

  useEffect(() => {
    getTaskStatistics(id).then((res) => {
      if (res.status === 200) {
        setTodos(res.data[0]?.count || 0)
        setInProgress(res.data[1]?.count || 0)
        setDones(res.data[2]?.count || 0)
        setLoading(false)
      }
    })
  }, [])

  return (
    <section className='grid grid-cols-3 m-3 gap-6'>
      <div className='p-5 border-solid border-2 border-sky-800 bg-zinc-900 hover:bg-zinc-950 rounded-md'>
        <p className='text-slate-400 text-sm'>Tasks to Do</p>
        <h1 className='text-xl'>{loading ? 0 : todos} tasks</h1>
      </div>
      <div className='p-5 border-solid border-2 border-yellow-800 bg-zinc-900 hover:bg-zinc-950 rounded-md'>
        <p className='text-slate-400 text-sm'>Tasks in Progress</p>
        <h1 className='text-xl'>{loading ? 0 : inProgress} tasks</h1>
      </div>
      <div className='p-5 border-solid border-2 border-emerald-800 bg-zinc-900 hover:bg-zinc-950 rounded-md'>
        <p className='text-slate-400 text-sm'>Tasks Done</p>
        <h1 className='text-xl'>{loading ? 0 : dones} tasks</h1>
      </div>
    </section>
  )
}

export default Statistics
