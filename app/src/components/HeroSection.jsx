import React from 'react'
import { Link } from 'react-router-dom'

function HeroSection() {
  return (
    <div>
        <section class="bg-transparent">
    <div class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div class="mr-auto place-self-center lg:col-span-7">
            <h1 class="max-w-2xl mb-4 text-4xl font-bold font-sor tracking-tight leading-none md:text-5xl xl:text-6xl text-[#292524]">AI Generated Poems Using Lilypad</h1>
            <p class="max-w-2xl mb-6 font-light lg:mb-8 md:text-lg lg:text-xl text-[#292524]">Get the generated peoms as nfts in your wallet.</p>
                <a href="#_" class="relative inline-block text-lg group">
                    <span class="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                    <span class="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                    <span class="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                    <Link to={'/explore'} class="relative">Explore</Link>
                    </span>
                    <span class="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0" data-rounded="rounded-lg"></span>
                </a>
        </div>
        <div class="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img className='rounded-lg' src="https://img.freepik.com/free-vector/hand-drawn-flat-design-poetry-illustration_52683-81527.jpg?w=2000" alt="mockup"/>
        </div>                
    </div>
</section>
    </div>
  )
}

export default HeroSection