function StatusColor({ status }) {
  if (status === 'Active') return <div className='bg-blue-700 w-6'></div>
  else if (status === 'Canceled')
    return <div className='bg-slate-700 w-6'></div>
  else if (status === 'Inactive')
    return <div className='bg-neutral-700 w-6'></div>
  else if (status === 'Draft') return <div className='bg-violet-700 w-6'></div>
  else return <div className='bg-emerald-700 w-6'></div>
}

export default StatusColor
