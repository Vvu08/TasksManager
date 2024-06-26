import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import ProjectLayout from '@/layouts/ProjectLayout'
import { Task } from '@/components'
import { getProjectTasks } from '@/api/statistic'
import { updateTaskStatus } from '@/api/tasks'

const data = [
  {
    id: '1',
    title: 'To Do',
    items: [
      {
        id: '1',
        title: 'Introduction',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel libero euismod, ultricies.',
        assignee: 'John Doe',
        priority: 5,
      },
      {
        id: '2',
        title: 'Introduction',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel libero euismod, ultricies.',
        assignee: 'John Doe',
        priority: 5,
      },
    ],
  },
  {
    id: '2',
    title: 'In Progress',
    items: [
      {
        id: '3',
        title: 'Introduction',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel libero euismod, ultricies.',
        assignee: 'John Doe',
        priority: 5,
      },
    ],
  },
  {
    id: '3',
    title: 'Pending',
    items: [
      {
        id: '4',
        title: 'Introduction',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel libero euismod, ultricies.',
        assignee: 'John Doe',
        priority: 5,
      },
    ],
  },
  {
    id: '4',
    title: 'Done',
    items: [
      {
        id: '5',
        title: 'Introduction',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        assignee: 'John Doe',
        priority: 5,
      },
    ],
  },
]

function Tracker() {
  const { id } = useRouter().query
  const [loading, setLoading] = useState(true)
  const [stores, setStores] = useState([
    {
      id: '1',
      title: 'To Do',
      items: [],
    },
    {
      id: '2',
      title: 'In Progress',
      items: [],
    },
    {
      id: '3',
      title: 'Pending',
      items: [],
    },
    {
      id: '4',
      title: 'Done',
      items: [],
    },
  ])
  const { roleId } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const handleDragAndDrop = (result) => {
    const { source, destination } = result

    if (roleId === 1 && destination.droppableId === '4') return

    if (!destination) return
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return
    const sourceColumnIndex = stores.findIndex(
      (store) => store.id === source.droppableId
    )
    const destinationColumnIndex = stores.findIndex(
      (store) => store.id === destination.droppableId
    )
    const updatedStores = [...stores]
    const sourceColumn = { ...updatedStores[sourceColumnIndex] }
    const destinationColumn = { ...updatedStores[destinationColumnIndex] }
    const [item] = sourceColumn.items.splice(source.index, 1)
    destinationColumn.items.splice(destination.index, 0, item)
    updatedStores[sourceColumnIndex] = sourceColumn
    updatedStores[destinationColumnIndex] = destinationColumn
    setStores(updatedStores)
    dispatch(
      updateTaskStatus({ taskId: item.taskId, statusId: destinationColumn.id })
    )
  }

  useEffect(() => {
    getProjectTasks(id).then((res) => {
      if (res.status === 200) {
        const updatedStores = [...stores]
        res.data.forEach((task) => {
          const storeIndex = updatedStores.findIndex(
            (store) => store.id === task.status.id.toString()
          )
          if (storeIndex !== -1) {
            updatedStores[storeIndex].items.push(task)
          }
        })
        setStores(updatedStores)
        setLoading(false)
      }
    })
  }, [])

  return (
    <ProjectLayout>
      <section className='m-3 px-10'>
        <div className='mb-4'>
          <h1 className='text-xl font-bold'>Tasks</h1>
        </div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <DragDropContext onDragEnd={handleDragAndDrop}>
            <div className='grid grid-cols-4 gap-5'>
              {stores.map((store) => (
                <div className='rounded-md shadow-md p-4 bg-neutral-800'>
                  <h2 className='font-bold'>{store.title}</h2>
                  <p className='text-sm text-slate-400'>
                    {store.items.length} tasks
                  </p>
                  <Droppable droppableId={store.id} key={store.id}>
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                        <div className='status-col'>
                          {store.items.map((item, index) => (
                            <Draggable
                              draggableId={item.taskId.toString()}
                              key={item.taskId.toString()}
                              index={index}
                            >
                              {(provided) => (
                                <div
                                  {...provided.dragHandleProps}
                                  {...provided.draggableProps}
                                  ref={provided.innerRef}
                                >
                                  <Task item={item} />
                                </div>
                              )}
                            </Draggable>
                          ))}
                        </div>
                      </div>
                    )}
                  </Droppable>
                </div>
              ))}
            </div>
          </DragDropContext>
        )}
      </section>
    </ProjectLayout>
  )
}

export default Tracker
