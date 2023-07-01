import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { createUser } from '@/api/users'

function UserForm({ setUsers }) {
  const router = useRouter()
  const [data, setData] = useState({})
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
    setError('')
  }

  const submitForm = () => {
    const { username, email, password, jobTitle } = data
    createUser(username, email, password, jobTitle).then((res) => {
      res.status === 201
        ? setUsers((prev) => [...prev, res.data])
        : setError('Something went wrong')
    })
  }

  return (
    <div className='mx-1 my-2 bg-neutral-800 rounded-md p-3'>
      <div className='flex items-center justify-center'>
        <form
          className='pl-3 flex flex-col'
          onSubmit={(e) => e.preventDefault()}
        >
          <div className='grid grid-cols-2'>
            <div>
              <label className='block text-slate-400' htmlFor='username'>
                Username
              </label>
              <input
                className='bg-transparent border-2 mb-2 border-slate-700 rounded-md pl-6 pr-5 py-2 w-30'
                type='username'
                name='username'
                id='username'
                placeholder='Username'
                required
                onChange={handleChange}
                minLength={3}
                maxLength={15}
              />
            </div>
            <div className='justify-self-end'>
              <label className='block text-slate-400' htmlFor='jobTitle'>
                Job Title
              </label>
              <input
                className='bg-transparent border-2 mb-2 border-slate-700 rounded-md pl-6 pr-5 py-2 w-30'
                type='jobTitle'
                name='jobTitle'
                id='jobTitle'
                placeholder='Designer'
                required
                onChange={handleChange}
                minLength={3}
                maxLength={15}
              />
            </div>
          </div>

          <label className='block text-slate-400' htmlFor='email'>
            Email
          </label>
          <input
            className='bg-transparent border-2 mb-2 border-slate-700 rounded-md pl-6 pr-5 py-2 w-96'
            type='email'
            name='email'
            id='email'
            placeholder='example@email.com'
            required
            onChange={handleChange}
            pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$'
          />

          <label className='block text-slate-400' htmlFor='password'>
            Password
          </label>
          <input
            className='bg-transparent border-2 border-slate-700 rounded-md pl-6 pr-5 py-2 mb-2 w-96'
            type='password'
            name='password'
            id='password'
            placeholder='********'
            required
            onChange={handleChange}
            minLength={5}
            maxLength={20}
          />
          <span
            className={`${
              error ? 'opacity-1' : 'opacity-0'
            } block text-red-300 pl-1 pb-2 transition-all`}
          >
            Error: {error}
          </span>

          <button
            className='bg-amber-700 hover:bg-amber-800 transition-all text-sky-100 font-bold py-2 px-4 rounded'
            type='submit'
            onClick={submitForm}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default UserForm
