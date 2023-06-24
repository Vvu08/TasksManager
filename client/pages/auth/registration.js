import Link from 'next/link'
import Layout from '@/layouts/AuthLayout'

function Registration() {
  return (
    <Layout>
      <h1 className='text-left text-xl font-bold mb-4'>Registration</h1>
      <form className='pl-3 flex flex-col'>
        <div className='grid grid-cols-2'>
          <div>
            <label className='block text-slate-400' htmlFor='username'>
              Username
            </label>
            <input
              className='bg-transparent border-2 border-slate-700 rounded-md pl-6 pr-5 py-2 w-30'
              type='username'
              name='username'
              id='username'
              placeholder='Username'
            />
            <span className={`opacity-0 block text-red-300 pl-1 pb-2`}>
              Error
            </span>
          </div>
          <div className='justify-self-end'>
            <label className='block text-slate-400' htmlFor='jobTitle'>
              Job Title
            </label>
            <input
              className='bg-transparent border-2 border-slate-700 rounded-md pl-6 pr-5 py-2 w-30'
              type='jobTitle'
              name='jobTitle'
              id='jobTitle'
              placeholder='Designer'
            />
            <span className={`opacity-0 block text-red-300 pl-1 pb-2`}>
              Error
            </span>
          </div>
        </div>

        <label className='block text-slate-400' htmlFor='email'>
          Email
        </label>
        <input
          className='bg-transparent border-2 border-slate-700 rounded-md pl-6 pr-5 py-2 w-96'
          type='email'
          name='email'
          id='email'
          placeholder='example@email.com'
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
          placeholder='********'
        />
        <span className={`opacity-0 block text-red-300 pl-1 pb-2`}>Error</span>

        <button
          className='bg-amber-700 hover:bg-amber-800 transition-all text-sky-100 font-bold py-2 px-4 rounded'
          type='submit'
        >
          Submit
        </button>
        <p className='text-sm text-slate-500 mt-2'>
          Have account already?
          <Link href={'login'} className='text-blue-600'>
            {' '}
            Login.
          </Link>
        </p>
      </form>
    </Layout>
  )
}

export default Registration
