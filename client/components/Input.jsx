import { useEffect, useRef } from 'react'

const ResizableInput = ({ value, setValue, disabled }) => {
  const inputRef = useRef(null)

  useEffect(() => {
    const input = inputRef.current
    input.style.width = 'auto'
    input.style.width = `${input.scrollWidth}px`
  }, [value])

  return (
    <input
      className={`text-xl font-bold bg-transparent inline-block min-w-min w-auto p-2 border-2 border-solid rounded-lg ${
        !disabled ? 'border-slate-500/50' : 'border-transparent'
      }`}
      ref={inputRef}
      defaultValue={value}
      onChange={(e) => setValue(e.target.value)}
      disabled={disabled}
    />
  )
}

export default ResizableInput
