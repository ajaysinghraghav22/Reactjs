import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Card from './COMPONENTS/card'

function App() {
  const [count, setCount] = useState(0)
  let aj={
    name:'ajay',
    age:20,
    address:'pune'
  }
  
  let arr=[1,2,3,4,5,6]

  return (
    <>
     <h1 className='bg-blue-300 text-black p-6 rounded-xl'>THAKUR AJAY SINGH RAGHAV</h1>
     {/* <figure class="bg-slate-100 rounded-xl p-8 dark:bg-slate-800">
  <img class="w-24 h-24 rounded-full mx-auto" src="https://yt3.googleusercontent.com/Fqfduifhh8bE8ChDhOfevM689lFJP0oHKXeyU-C3fAm7DcT6oeNizUFnRXpr3yllN0U7S0rbCQ=s176-c-k-c0x00ffffff-no-rj" alt="" width="384" height="512"/>
  <div class="pt-6 space-y-4">
    <blockquote>
      <p class="text-lg font-medium">
        “Tailwind CSS is the only framework that I've seen scale
        on large teams. It’s easy to customize, adapts to any design,
        and the build size is tiny.”
      </p>
    </blockquote>
    <figcaption class="font-medium">
      <div>
        AJAY RAJPUT
      </div>
      <div>
        Staff Engineer, Algolia
      </div>
    </figcaption>
  </div>
</figure> */}
<Card />
<Card vj="Ajay Singh Rajput" btnText="Click for more"/>
    </>
  )
}

export default App
