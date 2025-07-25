import { useState } from 'react'
import './App.css'
import './card.jsx'
import Card from './card.jsx'

function App() {
  let obj={
    name:'Ajay',
    age:20,
    address:'pune'
  };
  let arr =[1, 2, 3, 4, 5];

  return (
    <>
    console.log(props);
      <h1 className='bg-yellow-300 text-black p-6 rounded-xl'>Tailwind Test Ajay Raghav </h1>
      <Card pro={obj} new={arr} />
{/* 
      <figure class="bg-slate-100 rounded-xl p-8 dark:bg-slate-800">
  <img class="w-24 h-24 rounded-full mx-auto" src="https://images.pexels.com/photos/754595/pexels-photo-754595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" width="384" height="512"/>
  <div class="pt-6 text-center space-y-4">
    <blockquote>
      <p class="text-lg font-medium">
        “Tailwind CSS is the only framework that I've seen scale
        on large teams. It’s easy to customize, adapts to any design,
        and the build size is tiny.”
      </p>
    </blockquote>
    <figcaption class="font-medium">
      <div class="text-sky-500 dark:text-sky-400">
        Sarah Dayan
      </div>
      <div class="text-slate-700 dark:text-slate-500">
        Staff Engineer, Algolia
      </div>
    </figcaption>
  </div>
</figure> */}
    </>
  )
}

export default App
