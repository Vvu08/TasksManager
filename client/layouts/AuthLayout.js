const { default: Head } = require('next/head')

const Layout = ({ children, keywords }) => {
  return (
    <>
      <Head>
        <meta
          keywords={'management, projects, stories, tasks, work' + keywords}
        ></meta>
        <link rel='preconnect' href='https://fonts.googleapis.com'></link>
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossorigin
        ></link>
        <link
          href='https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap'
          rel='stylesheet'
        ></link>
      </Head>
      <div className='h-screen flex items-center justify-center '>
        <main className='py-20 px-40 bg-gray-800 rounded'>{children}</main>
      </div>
    </>
  )
}

export default Layout
