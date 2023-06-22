const options = (disabled) => {
  return {
    autoHide: true,
    todayBtn: false,
    clearBtn: false,
    maxDate: new Date('2030-01-01'),
    minDate: new Date('2023-01-01'),
    theme: {
      background: 'bg-neutral-800',
      icons: 'bg-neutral-700 text-gray-300 text-xs hover:bg-neutral-600',
      text: 'text-gray-300 text-xs hover:bg-neutral-700',
      disabledText: 'text-gray-500 hover:bg-neutral-800',
      input: `bg-transparent text-gray-300 dark:focus:border-transparent focus:border-transparent ${
        !disabled ? 'border-slate-500/50 cursor-pointer' : 'border-transparent'
      }`,
      inputIcon: 'text-gray-300',
      selected: 'bg-sky-900 hover:bg-sky-800 text-gray-300',
    },
    icons: {
      prev: () => <span className='text-gray-300'>Previous</span>,
      next: () => <span className='text-gray-300'>Next</span>,
    },
    datepickerClassNames: 'top-40',
    defaultDate: new Date(),
    language: 'en',
  }
}

export default options
