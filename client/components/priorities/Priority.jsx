import { priorities } from '@/utils/priorities'

function Priority({ priority }) {
  if (priority == 5)
    return (
      <p className='flex px-5 py-2.5 whitespace-nowrap text-orange-600'>
        <span dangerouslySetInnerHTML={{ __html: priorities[4].image }} />
        {priorities[4].label}
      </p>
    )
  else if (priority == 4)
    return (
      <p className='flex px-5 py-2.5 whitespace-nowrap text-amber-600'>
        <span dangerouslySetInnerHTML={{ __html: priorities[3].image }} />
        {priorities[3].label}
      </p>
    )
  else if (priority == 3)
    return (
      <p className='flex items-center px-5 py-2.5 whitespace-nowrap text-gray-400'>
        <span dangerouslySetInnerHTML={{ __html: priorities[2].image }} />
        {priorities[2].label}
      </p>
    )
  else if (priority == 2)
    return (
      <p className='flex items-center px-5 py-2.5 whitespace-nowrap text-sky-600'>
        <span dangerouslySetInnerHTML={{ __html: priorities[1].image }} />
        {priorities[1].label}
      </p>
    )
  else
    return (
      <p className='flex items-center px-5 py-2.5 whitespace-nowrap text-indigo-300'>
        <span dangerouslySetInnerHTML={{ __html: priorities[0].image }} />
        {priorities[0].label}
      </p>
    )
}

export default Priority
