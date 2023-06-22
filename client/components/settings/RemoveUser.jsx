import React from 'react'

function RemoveUser() {
  return (
    <div className='flex cursor-pointer'>
      <p className='text-red-300'>Remove</p>
      <svg
        className='ml-1'
        width='23'
        height='23'
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <circle
          cx='12'
          cy='12'
          r='9'
          stroke='rgb(252 165 165)'
          stroke-width='2'
        />
        <path d='M7.5 12H16.5' stroke='rgb(252 165 165)' stroke-width='2' />
      </svg>
    </div>
  )
}

export default RemoveUser
