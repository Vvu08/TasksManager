import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { Textarea } from '@/components'
import { getUsers } from '@/api/users'
import { assignUserToProject } from '@/api/projects'

function AssignForm({ open, setOpen, assignees, setAssignees }) {
  const { id } = useRouter().query
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState({})
  const dispatch = useDispatch()

  const submitForm = () => {
    dispatch(assignUserToProject({ projectId: id, userId: selectedUser.id }))
    setAssignees((prev) => [...prev, selectedUser])
    setOpen(false)
  }

  useEffect(() => {
    dispatch(getUsers()).then((res) => {
      if (res.payload)
        if (res.payload.status === 200) {
          setUsers(res.payload.data)
          setSelectedUser(res.payload.data[0])
        }
    })
  }, [])

  const filteredUsers = users.filter(
    (user) =>
      user.role.id !== 2 &&
      user.role.id !== 3 &&
      !assignees.find((assignee) => assignee.id === user.id)
  )

  return (
    <article
      className={`${
        open ? 'block' : 'hidden'
      } fixed z-1 inset-0 w-full h-full overflow-auto bg-neutral-900/75`}
    >
      <section className='rounded bg-neutral-800 mx-20 md:mx-40 lg:mx-96 my-3 p-3 border-2 border-solid border-neutral-700'>
        <div className='grid grid-cols-2 mr-2'>
          <h1 className='justify-self-start text-lg'>
            Assign new User to Project
          </h1>
          <button
            onClick={() => setOpen(false)}
            className='flex items-center gap-1 text-slate-300 font-semibold text-sm px-2 py-1 rounded justify-self-end'
          >
            <svg
              width='21'
              height='21'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 10.8181 3.23279 9.64778 3.68508 8.55585C4.13738 7.46392 4.80031 6.47177 5.63604 5.63604C6.47177 4.80031 7.46392 4.13738 8.55585 3.68508C9.64778 3.23279 10.8181 3 12 3C13.1819 3 14.3522 3.23279 15.4442 3.68508C16.5361 4.13738 17.5282 4.80031 18.364 5.63604C19.1997 6.47177 19.8626 7.46392 20.3149 8.55585C20.7672 9.64778 21 10.8181 21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4441 20.3149C14.3522 20.7672 13.1819 21 12 21L12 21Z'
                stroke='rgb(203 213 225)'
                strokeWidth='2'
                strokeLinecap='round'
              />
              <path
                d='M9 9L15 15'
                stroke='rgb(203 213 225)'
                strokeWidth='2'
                strokeLinecap='round'
              />
              <path
                d='M15 9L9 15'
                stroke='rgb(203 213 225)'
                strokeWidth='2'
                strokeLinecap='round'
              />
            </svg>
          </button>
        </div>
        <form
          className='grid gap-4 grid-cols-2 mt-4'
          onSubmit={(e) => e.preventDefault()}
        >
          {filteredUsers.length > 0 ? (
            <>
              {filteredUsers.map((user, index) => (
                <div
                  key={user.id}
                  onClick={() => setSelectedUser(user)}
                  className={`flex justify-items-stretch border-2 border-solid p-2 rounded ${
                    user === selectedUser
                      ? 'bg-neutral-900 border-sky-900'
                      : 'border-neutral-600'
                  }`}
                >
                  <label htmlFor={user.id}>
                    {index + 1}. {user.username} - {user.role.type}
                  </label>
                </div>
              ))}
              <button
                onClick={submitForm}
                className='flex mx-auto gap-1 bg-sky-700/75 hover:bg-sky-700 text-slate-100 col-span-2 px-2 py-2 rounded justify-self-start mb-2'
              >
                <svg
                  width='22'
                  height='22'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M9 10L12.2581 12.4436C12.6766 12.7574 13.2662 12.6957 13.6107 12.3021L20 5'
                    stroke='#fff'
                    strokeWidth='2'
                    strokeLinecap='round'
                  />
                  <path
                    d='M21 12C21 13.8805 20.411 15.7137 19.3156 17.2423C18.2203 18.7709 16.6736 19.9179 14.893 20.5224C13.1123 21.1268 11.187 21.1583 9.38744 20.6125C7.58792 20.0666 6.00459 18.9707 4.85982 17.4789C3.71505 15.987 3.06635 14.174 3.00482 12.2945C2.94329 10.415 3.47203 8.56344 4.51677 6.99987C5.56152 5.4363 7.06979 4.23925 8.82975 3.57685C10.5897 2.91444 12.513 2.81996 14.3294 3.30667'
                    stroke='#fff'
                    strokeWidth='2'
                    strokeLinecap='round'
                  />
                </svg>
                Assign Selected User
              </button>
            </>
          ) : (
            <div className='col-span-2 text-center text-slate-300'>
              No users available to assign
            </div>
          )}
        </form>
      </section>
    </article>
  )
}

export default AssignForm
