export const setDateToSend = (date) =>
  `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date
    .getHours()
    .toString()
    .padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`

export const setDateToDisplay = (date) =>
  date.toLocaleString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
