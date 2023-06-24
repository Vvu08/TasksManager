import usePopup from '@/hooks/usePopup'

const roles = ['Admin', 'Manager', 'User']

function SelectRole({ value, setValue }) {
  const { isOpen, toggle } = usePopup('role-dropdown')
  const matchedRole = roles.find((role) => role === value)

  const selectRole = (selectedValue) => {
    setValue(selectedValue)
    toggle()
  }

  return (
    <div>
      <div
        className='cursor-pointer flex text-gray-300 gap-1 bg-transparent w-full overflow-hidden resize-none px-2'
        onClick={toggle}
      >
        {matchedRole}
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
        <ul className='role-dropdown grid grid-rows-3 bg-gray-800 rounded-lg absolute'>
          {roles.map((role, index) => (
            <li
              key={index}
              type='button'
              className='pl-4 pr-10 py-1 bg-gray-800 hover:bg-gray-700 focus:bg-gray-900 flex gap-1 items-center text-gray-300 rounded-lg cursor-pointer'
              onClick={() => selectRole(role)}
            >
              {role}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SelectRole
