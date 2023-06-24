import { useState, useEffect } from 'react'

const usePopup = (className) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)

  const handleOutsideClick = (e) => {
    const popupElement = document.querySelector(`.${className}`)
    if (popupElement && !popupElement.contains(e.target)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    isOpen
      ? document.addEventListener('mousedown', handleOutsideClick)
      : document.removeEventListener('mousedown', handleOutsideClick)
  })

  return { isOpen, toggle }
}

export default usePopup
