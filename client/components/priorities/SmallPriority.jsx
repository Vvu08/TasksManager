import { priorities } from '@/utils/priorities'

function Priority({ priority }) {
  if (priority == 5)
    return (
      <p className='ml-auto'>
        <span dangerouslySetInnerHTML={{ __html: priorities[4].image }} />
      </p>
    )
  else if (priority == 4)
    return (
      <p className='ml-auto'>
        <span dangerouslySetInnerHTML={{ __html: priorities[3].image }} />
      </p>
    )
  else if (priority == 3)
    return (
      <p className='ml-auto'>
        <span dangerouslySetInnerHTML={{ __html: priorities[2].image }} />
      </p>
    )
  else if (priority == 2)
    return (
      <p className='ml-auto'>
        <span dangerouslySetInnerHTML={{ __html: priorities[1].image }} />
      </p>
    )
  else
    return (
      <p className='ml-auto'>
        <span dangerouslySetInnerHTML={{ __html: priorities[0].image }} />
      </p>
    )
}

export default Priority
