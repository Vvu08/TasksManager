import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  SelectProjectStatus,
  Textarea,
  AssignForm,
  Assignees,
} from '@/components'
import ProjectLayout from '@/layouts/ProjectLayout'
import { getProject, updateProject } from '@/api/projects'
import { useRouter } from 'next/router'

function Settings() {
  const { id } = useRouter().query
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState(undefined)
  const [status, setStatus] = useState(undefined)
  const [assignees, setAssignees] = useState([])
  const { id: roleId } = useSelector((state) => state.auth.user.role)
  const dispatch = useDispatch()

  const handleEdit = () => {
    dispatch(
      updateProject({
        id,
        title,
        status,
      })
    )
  }

  useEffect(() => {
    dispatch(getProject(id)).then((res) => {
      if (res.payload)
        if (res.payload.status === 200) {
          setLoading(false)
          setTitle(res.payload.data.title)
          setStatus(res.payload.data.status)
        }
    })
  }, [])

  return (
    <ProjectLayout keywords={'settings'}>
      <section className='m-3 px-10'>
        <h1 className='text-xl font-bold'>Settings</h1>

        {loading ? (
          <div className='mx-1 my-2 bg-neutral-800 rounded-md p-3'>
            <div className='grid grid-cols-2 items-end'>
              <div>
                <h2 className='font-semibold'>Title</h2>
                <p className='text-sm text-slate-400'>
                  You can change the title of your project here.
                </p>
              </div>
              <p>Loading...</p>
            </div>
            <div className='grid grid-cols-2 items-end'>
              <div>
                <h2 className='font-semibold'>Status</h2>
                <p className='text-sm text-slate-400'>
                  You can change the status of your project here.
                </p>
              </div>
              <p>Loading...</p>
            </div>
          </div>
        ) : (
          <>
            <div className='mx-1 my-2 bg-neutral-800 rounded-md p-3'>
              <div className='grid grid-cols-2 items-center'>
                <div>
                  <h2 className='font-semibold'>Title</h2>
                  <p className='text-sm text-slate-400'>
                    You can change the title of your project here.
                  </p>
                </div>
                <Textarea
                  value={title}
                  setValue={setTitle}
                  disabled={roleId === 3 ? false : true}
                />
              </div>
              <div className='grid grid-cols-2 items-center'>
                <div>
                  <h2 className='font-semibold'>Status</h2>
                  <p className='text-sm text-slate-400'>
                    You can change the status of your project here.
                  </p>
                </div>
                <SelectProjectStatus
                  value={status}
                  setValue={setStatus}
                  disabled={roleId === 3 ? false : true}
                />
              </div>
            </div>
            {roleId === 3 && (
              <button
                className='text-slate-300 text-sm pb-3'
                onClick={handleEdit}
              >
                Save changes
              </button>
            )}
          </>
        )}
        <div className='mx-1 my-2 bg-neutral-800 rounded-md p-3'>
          <div>
            <div className='flex items-center'>
              <h2 className='font-semibold'>Users</h2>
              {roleId === 3 && (
                <div className='text-sm pl-3 grid grid-cols-2 items-end cursor-pointer text-sky-200 hover:text-sky-300 transition-all'>
                  <p onClick={() => setOpen(true)}>+ User</p>
                </div>
              )}
            </div>
            <p className='text-sm text-slate-400'>
              Add or remove users from your project. Change their roles.
            </p>
          </div>
          <Assignees assignees={assignees} setAssignees={setAssignees} />
        </div>
        <AssignForm
          open={open}
          setOpen={setOpen}
          assignees={assignees}
          setAssignees={setAssignees}
        />
      </section>
    </ProjectLayout>
  )
}

export default Settings
