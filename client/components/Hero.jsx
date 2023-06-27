import React from 'react'

function Hero() {
  return (
    <section className='px-3 py-6 grid'>
      <h1 className='text-xl text-center self-end mb-4 text-neutral-300'>
        Welcome to TaskMaster: The Ultimate Tasks Management Solution!
      </h1>
      <p className='text-justify md:text-md lg:text-lg text-slate-400 lg:px-30 md:px-10'>
        With TaskMaster, you can wave goodbye to the chaos of scattered to-do
        lists and welcome a streamlined and efficient approach to task
        management. Whether you're a busy professional, a student, or simply
        someone with a busy schedule, our powerful features will help you stay
        on top of your tasks and achieve your goals with ease.
      </p>
    </section>
  )
}

export default Hero
