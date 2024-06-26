import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProjectLayout from '@/layouts/ProjectLayout'
import {
  Textarea,
  Input,
  SelectPriority,
  SelectStatus,
  SelectAssignee,
  TaskCreator,
} from '@/components'
import { getTask, updateTask } from '@/api/tasks'

function Task() {
  const router = useRouter()
  const [id, setId] = useState(undefined)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState(undefined)
  const [status, setStatus] = useState(undefined)
  const [assignee, setAssignee] = useState(undefined)
  const [creator, setCreator] = useState(undefined)
  const [disabled, setDisabled] = useState(true)
  const [loading, setLoading] = useState(true)
  const { roleId } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const handleEdit = () => {
    setDisabled(!disabled)
    !disabled &&
      dispatch(
        updateTask({
          id,
          title,
          description,
          priority,
        })
      )
  }

  useEffect(() => {
    dispatch(getTask(router.query.taskId)).then((res) => {
      if (res.payload) {
        setId(res.payload.data.id)
        setTitle(res.payload.data.title)
        setDescription(res.payload.data.description)
        setPriority(res.payload.data.priority)
        setStatus(res.payload.data.status)
        setAssignee(res.payload.data.assignedUserId)
        setCreator(res.payload.data.taskCreatorId)
        setLoading(false)
      }
    })
  }, [])

  return (
    <ProjectLayout>
      <section className='m-3 px-10'>
        <div className='flex gap-4 items-center mb-3'>
          <Input value={title} setValue={setTitle} disabled={disabled} />
          {roleId === 3 && (
            <button className='text-slate-400 text-sm' onClick={handleEdit}>
              {disabled ? 'Edit' : 'Save'}
            </button>
          )}
        </div>
        <h2 className='text-lg mb-2'>Details</h2>
        <div className='grid lg:grid-cols-2 gap-4 md:grid-cols-1'>
          <section>
            <div className='pl-2 grid grid-cols-2 gap-2 mb-2'>
              <h3 className='text-slate-300'>Description</h3>
              {loading ? (
                <>Loading...</>
              ) : (
                <Textarea
                  value={description}
                  setValue={setDescription}
                  disabled={disabled}
                />
              )}
            </div>
          </section>
          <section>
            <div className='pl-2 grid grid-cols-2 gap-2 mb-2'>
              <h3 className='text-slate-300'>Priority</h3>
              <SelectPriority
                value={priority}
                setValue={setPriority}
                disabled={disabled}
              />
            </div>
            <div className='pl-2 grid grid-cols-2 gap-2 mb-2'>
              <h3 className='text-slate-300'>Status</h3>
              <SelectStatus
                value={status}
                setValue={setStatus}
                disabled={disabled}
              />
            </div>
          </section>
          <section>
            <h2 className='text-lg mb-2'>People</h2>
            <div className='pl-2 grid grid-cols-2 gap-2 mb-2'>
              <h3 className='text-slate-300'>Assignee</h3>
              {loading ? (
                <>Loading... </>
              ) : (
                <SelectAssignee value={assignee} setValue={setAssignee} />
              )}
            </div>
            <div className='pl-2 grid grid-cols-2 gap-2 mb-2 pt-3'>
              <h3 className='text-slate-300'>Creator</h3>
              {loading ? <>Loading... </> : <TaskCreator creatorId={creator} />}
            </div>
          </section>
        </div>
      </section>
    </ProjectLayout>
  )
}

export default Task
