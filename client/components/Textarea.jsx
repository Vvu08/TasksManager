import { useRef, useEffect } from 'react'

const Textarea = ({ value, setValue, disabled }) => {
  const textareaRef = useRef(null)

  useEffect(() => {
    const textarea = textareaRef.current
    textarea.style.height = 'auto'
    textarea.style.height = `${textarea.scrollHeight}px`
  }, [value])

  return (
    <textarea
      className={`text-grey-500 bg-transparent w-full overflow-hidden resize-none p-2 border-2 border-solid rounded-lg ${
        !disabled ? 'border-slate-500/50' : 'border-transparent'
      } `}
      ref={textareaRef}
      defaultValue={value}
      onChange={(e) => setValue(e.target.value)}
      style={{ resize: 'none', minHeight: '64px' }}
      disabled={disabled}
      placeholder='Enter text here...'
    />
  )
}

export default Textarea
