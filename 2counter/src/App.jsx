import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  let [counter,setcounter] =useState(5)

//let counter=5;
const addvalue=()=>{
counter=counter+1;
console.log("clicked",counter);
setcounter(counter);
}

const removevalue=()=>{
counter=counter-1;
console.log("clicked",counter);
setcounter(counter);
}
  return (
    <>
      <h1> Ajay Singh Raghav Lovely Professional University </h1>
      <h2>counter value :{counter}</h2>


      <button onClick={addvalue}>Increase</button>
      <br />
      <br />
      <button onClick={removevalue}>Decrease</button>
    </>
  )
}

export default App
