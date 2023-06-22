import { useState, useEffect } from 'react'
import projectStatuses from '@/utils/projectStatus'
import SVGRenderer from '../SVGRenderer'

function SelectStatus({ value, setValue }) {
  const [isOpen, setIsOpen] = useState(false)
  const matchedStatus = projectStatuses.find((status) => status.value === value)

  const toggleDropdown = () => setIsOpen(!isOpen)

  const selectStatus = (selectedValue) => {
    setValue(selectedValue)
    setIsOpen(false)
  }

  const handleOutsideClick = (e) => {
    if (e.target.closest('.status-dropdown')) return
    setIsOpen(false)
  }

  useEffect(() => {
    isOpen
      ? document.addEventListener('mousedown', handleOutsideClick)
      : document.removeEventListener('mousedown', handleOutsideClick)
  })
  return (
    <div>
      <div
        className='cursor-pointer flex text-gray-300 gap-1 bg-transparent w-full overflow-hidden resize-none p-2'
        onClick={toggleDropdown}
      >
        <SVGRenderer svgCode={matchedStatus.image} />
        {matchedStatus.value}

        <svg
          className='ml-1'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M18 9L12 15L6 9'
            stroke='rgb(209 213 219)'
            stroke-width='2'
          />
        </svg>
      </div>
      {isOpen && (
        <ul className='status-dropdown grid grid-rows-5 bg-gray-800 rounded-lg absolute'>
          {projectStatuses.map((status, index) => (
            <li
              key={index}
              type='button'
              className='pl-4 pr-10 py-1 bg-gray-800 hover:bg-gray-700 focus:bg-gray-900 flex gap-1 items-center text-gray-300 rounded-lg cursor-pointer'
              onClick={() => selectStatus(status.value)}
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
