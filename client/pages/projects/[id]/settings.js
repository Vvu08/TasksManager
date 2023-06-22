import { useState } from 'react'
import { SelectProjectStatus, SelectRole, RemoveUser } from '@/components'
import ProjectLayout from '@/layouts/ProjectLayout'

function Settings() {
  const [status, setStatus] = useState('Active')
  const [role, setRole] = useState('Admin')

  return (
    <ProjectLayout keywords={'settings'}>
      <section className='m-3 px-10'>
        <h1 className='text-xl font-bold'>Settings</h1>
        <div className='mx-1 my-2 bg-neutral-800 rounded-md p-3'>
          <div className='grid grid-cols-2 items-end'>
            <div>
              <h2 className='font-semibold'>Status</h2>
              <p className='text-sm text-slate-400'>
                You can change the status of your project here.
              </p>
            </div>
            <SelectProjectStatus value={status} setValue={setStatus} />
          </div>
        </div>
        <div className='mx-1 my-2 bg-neutral-800 rounded-md p-3'>
          <div>
            <h2 className='font-semibold'>Users</h2>
            <p className='text-sm text-slate-400'>
              Add or remove users from your project. Change their roles.
            </p>
          </div>
          <div className='pl-3 grid grid-cols-2 items-end'>
            <div className='mt-1'>
              <h2 className='text-md'>John Doe</h2>
              <p className='text-xs text-slate-400'>
                Main programmer of the project.
              </p>
            </div>
            <div className='flex gap-5'>
              <SelectRole value={role} setValue={setRole} />
              <RemoveUser />
            </div>
          </div>
          <div className='mt-2 pl-3 grid grid-cols-2 items-end cursor-pointer text-sky-200 hover:text-sky-300 transition-all'>
            <p>Add User</p>
          </div>
        </div>
      </section>
    </ProjectLayout>
  )
}

export default Settings
