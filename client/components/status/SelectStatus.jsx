import React, { useState, useEffect } from 'react'
import statuses from '@/utils/status'
import SVGRenderer from '../SVGRenderer'
import usePopup from '@/hooks/usePopup'

function SelectStatus({ value, setValue, isFilter }) {
  const { isOpen, toggle } = usePopup('status-dropdown')
  const matchedStatus = statuses.find((status) => status.id === value?.id)

  const selectStatus = (selectedValue) => {
    setValue(selectedValue)
    toggle()
  }

  return (
    <div>
      <div
        className={`flex text-grey-500 gap-1 bg-transparent w-full overflow-hidden resize-none p-2 border-2 border-solid rounded-lg ${'border-slate-500/50 cursor-pointer '}`}
        onClick={toggle}
      >
        {matchedStatus ? (
          <React.Fragment key={matchedStatus.value}>
            <SVGRenderer svgCode={matchedStatus.image} />
            {matchedStatus.value}
          </React.Fragment>
        ) : (
          <>All statuses</>
        )}

        <svg
          className='ml-auto'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <circle
            cx='12'
            cy='12'
            r='1'
            stroke='rgb(100 116 139)'
            strokeWidth='2'
            strokeLinecap='round'
          />
          <circle
            cx='6'
            cy='12'
            r='1'
            stroke='rgb(100 116 139)'
            strokeWidth='2'
            strokeLinecap='round'
          />
          <circle
            cx='18'
            cy='12'
            r='1'
            stroke='rgb(100 116 139)'
            strokeWidth='2'
            strokeLinecap='round'
          />
        </svg>
      </div>
      {isOpen && (
        <ul className='status-dropdown grid grid-rows-4 mt-1 ml-2 bg-gray-800 rounded-lg absolute'>
          {isFilter && (
            <li
              key={4}
              type='button'
              className='pl-4 pr-10 py-1 bg-gray-800 hover:bg-gray-700 focus:bg-gray-900 flex gap-1 items-center text-gray-100 rounded-lg cursor-pointer'
              onClick={() => selectStatus(null)}
            >
              All statuses
            </li>
          )}
          {statuses.map((status, index) => (
            <li
              key={index}
              type='button'
              className='pl-4 pr-10 py-1 bg-gray-800 hover:bg-gray-700 focus:bg-gray-900 flex gap-1 items-center text-gray-100 rounded-lg cursor-pointer'
              onClick={() => selectStatus(status)}
            >
              <SVGRenderer svgCode={status.image} />
              {status.value}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SelectStatus
