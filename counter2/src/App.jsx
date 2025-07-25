import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  
  //let counter=15
  let[counter,setCounter]=useState(5)

const addvalue=()=>{
  counter++;
  console.log("value is increased",counter);
  setCounter( counter);
}
const remove=()=>{
  counter--;
  console.log("value is increased",counter);
  setCounter( counter);
}



  return (
    <>
     <h1> Ajay raghav</h1>
     <h2>Counter value : {counter}</h2>
     <button 
     onClick={addvalue}
     >Add value </button>
     <br />
     <br />
     <button onClick={remove} >Remove Value</button>
    </>
  )
}

export default App
