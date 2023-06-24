import Layout from '@/layouts/AuthLayout'
import Link from 'next/link'
import React from 'react'

function Login() {
  return (
    <Layout>
      <h1 className='text-left text-xl font-bold mb-4'>Login</h1>
      <form className='pl-3 flex flex-col'>
        <label className='block text-slate-400' htmlFor='email'>
          Email
        </label>
        <input
          className='bg-transparent border-2 border-slate-700 rounded-md pl-6 pr-5 py-2 w-96'
          type='email'
          name='email'
          id='email'
        />
        <span className={`opacity-0 block text-red-300 pl-1 pb-2`}>Error</span>

        <label className='block text-slate-400' htmlFor='password'>
          Password
        </label>
        <input
          className='bg-transparent border-2 border-slate-700 rounded-md pl-6 pr-5 py-2 w-96'
          type='password'
          name='password'
          id='password'
        />
        <span className={`opacity-0 block text-red-300 pl-1 pb-2`}>Error</span>

        <button
          className='bg-blue-600 hover:bg-blue-700 transition-all text-white font-bold py-2 px-4 rounded'
          type='submit'
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
