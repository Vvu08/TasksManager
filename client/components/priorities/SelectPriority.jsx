import React, { useEffect, useState } from 'react'
import SVGRenderer from '../SVGRenderer'
import { priorities } from '@/utils/priorities'
import usePopup from '@/hooks/usePopup'

function SelectPriority({ value, setValue, disabled, isFilter }) {
  const [isClient, setIsClient] = useState(false)
  const { isOpen, toggle } = usePopup('priority-dropdown')
  const matchedPriority = priorities.find(
    (priority) => priority.value === value
  )
  useEffect(() => {
    setIsClient(true)
  }, [])

  const selectPriority = (selectedValue) => {
    setValue(selectedValue)
    toggle()
  }

  return (
    <div>
      <div
        className={`flex text-grey-500 bg-transparent w-full overflow-hidden resize-none p-2 border-2 border-solid rounded-lg gap-1 ${
          !disabled
            ? 'border-slate-500/50 cursor-pointer '
            : 'border-transparent'
        }`}
        onClick={!disabled ? toggle : undefined}
        disabled={disabled}
      >
        {matchedPriority ? (
          <React.Fragment key={matchedPriority.value}>
            {isClient && <SVGRenderer svgCode={matchedPriority.image} />}
            {matchedPriority.label}
          </React.Fragment>
        ) : (
          <>All priorities</>
        )}
        {!disabled && (
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
              stroke-width='2'
              stroke-linecap='round'
            />
            <circle
              cx='6'
              cy='12'
              r='1'
              stroke='rgb(100 116 139)'
              stroke-width='2'
              stroke-linecap='round'
            />
            <circle
              cx='18'
              cy='12'
              r='1'
              stroke='rgb(100 116 139)'
              stroke-width='2'
              stroke-linecap='round'
            />
          </svg>
        )}
      </div>
      {isOpen && (
        <ul className='priority-dropdown grid grid-rows-5 mt-1 ml-2 bg-gray-800 rounded-lg absolute'>
          {isFilter && (
            <li
              key={5}
              type='button'
              className='pl-4 pr-10 py-1 bg-gray-800 hover:bg-gray-700 focus:bg-gray-900 flex gap-1 items-center text-gray-100 rounded-lg cursor-pointer'
              onClick={() => selectPriority(null)}
            >
              All priorities
            </li>
          )}
          {priorities.map((priority) => (
            <li
              key={priority.value}
              type='button'
              className='text-left pl-4 pr-10 py-1 bg-gray-800 hover:bg-gray-700 focus:bg-gray-900 flex items-center text-gray-100 rounded-lg cursor-pointer'
              onClick={() => selectPriority(priority.value)}
            >
              {isClient && <SVGRenderer svgCode={priority.image} />}
              {priority.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SelectPriority
