function Statistics() {
  return (
    <section className='grid grid-cols-3 m-3 gap-6'>
      <div className='p-5 border-solid border-2 border-sky-800 bg-zinc-900 hover:bg-zinc-950 rounded-md'>
        <p className='text-slate-400 text-sm'>Tasks to Do</p>
        <h1 className='text-xl'>5 tasks</h1>
      </div>
      <div className='p-5 border-solid border-2 border-yellow-800 bg-zinc-900 hover:bg-zinc-950 rounded-md'>
        <p className='text-slate-400 text-sm'>Tasks in Progress</p>
        <h1 className='text-xl'>3 tasks</h1>
      </div>
      <div className='p-5 border-solid border-2 border-emerald-800 bg-zinc-900 hover:bg-zinc-950 rounded-md'>
        <p className='text-slate-400 text-sm'>Tasks Done</p>
        <h1 className='text-xl'>7 tasks</h1>
      </div>
    </section>
  )
}

export default Statistics
