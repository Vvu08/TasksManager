import statuses from '@/utils/status'

function Status({ status }) {
  if (status.id === 1)
    return (
      <span className={`flex items-center gap-1 text${statuses[0].color}`}>
        <span dangerouslySetInnerHTML={{ __html: statuses[0].image }} />
        {statuses[0].value}
      </span>
    )
  else if (status.id === 2)
    return (
      <span className={`flex items-center gap-1 text-${statuses[1].color}`}>
        <span dangerouslySetInnerHTML={{ __html: statuses[1].image }} />
        {statuses[1].value}
      </span>
    )
  else if (status.id === 4)
    return (
      <span className={`flex items-center gap-1 text-${statuses[3].color}`}>
        <span dangerouslySetInnerHTML={{ __html: statuses[3].image }} />
        {statuses[3].value}
      </span>
    )
  else
    return (
      <span className={`flex items-center gap-1 text-${statuses[2].color}`}>
        <span dangerouslySetInnerHTML={{ __html: statuses[2].image }} />
        {statuses[2].value}
      </span>
    )
}

export default Status
