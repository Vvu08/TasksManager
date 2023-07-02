import React from 'react'
import Datepicker from 'tailwind-datepicker-react'
import options from '@/utils/datepicker'

function DatesPicker({ value, setValue, disabled }) {
  const [show, setShow] = React.useState(false)

  const handleChange = (selectedDate) => setValue(selectedDate)

  const handleClose = (state) => !disabled && setShow(state)
  return (
    <>
      <Datepicker
        options={options(disabled, value)}
        onChange={handleChange}
        show={show && !disabled}
        setShow={handleClose}
        disabled={true}
      />
    </>
  )
}

export default DatesPicker
