import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Layout from '@/layouts/AuthLayout'
import { loginUser } from '@/api/users'
import { useDispatch } from 'react-redux'

function Login() {
  const router = useRouter()
  const [data, setData] = useState({})
  const [error, setError] = useState('')
  const dispatch = useDispatch()

  const handleChange = (e) => {
    const { name, value } = e.target
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
    setError('')
  }

  const submitForm = () => {
    const { username, password } = data
    dispatch(loginUser({ username, password })).then((res) => {
      res.payload.status === 200
        ? router.push('/')
        : setError('Something went wrong')
    })
  }

  return (
    <Layout>
      <h1 className='text-left text-xl font-bold mb-4'>Login</h1>
      <form className='pl-3 flex flex-col' onSubmit={(e) => e.preventDefault()}>
        <label className='block text-slate-400' htmlFor='username'>
          Username
        </label>
        <input
          className='bg-transparent border-2 border-slate-700 rounded-md pl-6 pr-5 py-2 w-96'
          type='username'
          name='username'
          id='username'
          required
          minLength={3}
          maxLength={15}
          onChange={handleChange}
        />

        <label className='mt-4 block text-slate-400' htmlFor='password'>
          Password
        </label>
        <input
          className='bg-transparent border-2 border-slate-700 rounded-md pl-6 pr-5 py-2 w-96'
          type='password'
          name='password'
          id='password'
          minLength={5}
          maxLength={20}
          required
          onChange={handleChange}
        />
        <span
          className={`${
            error ? 'opacity-1' : 'opacity-0'
          } block text-red-300 pl-1 pb-2 transition-all`}
        >
          Error: {error}
        </span>

        <button
          className='bg-blue-600 hover:bg-blue-700 transition-all text-white font-bold py-2 px-4 rounded'
          type='submit'
          onClick={submitForm}
        >
          Submit
        </button>

        <p className='text-sm text-slate-500 mt-2'>
          Don't have account yet?
          <Link href={'registration'} className='text-amber-600'>
            {' '}
            Register.
          </Link>
        </p>
      </form>
    </Layout>
  )
}

export default Login
