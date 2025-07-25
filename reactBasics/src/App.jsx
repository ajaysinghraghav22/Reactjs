import { useState } from 'react'
import Ajay from './ajay'
import './App.css'
import TodoList from './todo'
import 


function MyButton() {
  const [count, setcount] =useState(0);
  function btn(){
    // alert('Button clicked!')
    setcount(count + 1);
  }
  function minbtn(){
    // alert('Button clicked!')
    setcount(count + -1);
  }

  return (
    <div>
    <button onClick={btn}>
      I'm a +button{count}
    </button>
     <button onClick={minbtn}>
     I'm a -button{count}
   </button>
   </div>
  );
}


const user = {
  name: 'Hedy Lamarr',
  imageUrl: 'https://dynamic-media.tacdn.com/media/photo-o/2e/a3/38/3d/caption.jpg?w=1100&h=800&s=1',
  imageSize: 90,
};
 


function App() {


  return (
    <>
      <h1>About {user.name}</h1>
      <p>Hello there.<br />How do you do?</p>
      <img  src={user.imageUrl}
      style={{
        width: user.imageSize,
        height: user.imageSize
      }}
    
       />
      <Ajay />
      <MyButton />
      <TodoList/>

    </>
  )
} 

export default App
