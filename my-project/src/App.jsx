import { useState } from "react"

function App() {
 const [color,setColor]=useState("yellow")

  return (
    <>
    <div className="w-full h-screen duration-200"
    style={{backgroundColor : color}}>
     <div className="fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2">
      <div className="flex flex-wrap justify-center gap-3 shadow-lg bg-white px-3 py-2 rounded-lg " >
        <button onClick={()=>setColor("red")} className="outline-none py-3 px-7 rounded-full text-black  shadow-lg" style={{backgroundColor:"red"}}>Red</button>

        <button onClick={()=>setColor("Green")} className="outline-none py-3 px-7 rounded-full text-black  shadow-lg" style={{backgroundColor:"Green"}}>Green</button>

        <button onClick={()=>setColor("white")} className="outline-none py-3 px-7 rounded-full text-black shadow-lg" style={{backgroundColor:"white"}}>white</button>

        <button onClick={()=>setColor("yellow")} className="outline-none py-3 px-7 rounded-full text-black  shadow-lg" style={{backgroundColor:"yellow"}}>yellow</button>
        
        <button onClick={()=>setColor("pink")} className="outline-none py-3 px-7 rounded-full text-black  shadow-lg" style={{backgroundColor:"pink"}}>pink</button>
        
        <button onClick={()=>setColor("blue")} className="outline-none py-3 px-7 rounded-full text-black  shadow-lg" style={{backgroundColor:"blue"}}>blue</button>
        
        <button onClick={()=>setColor("orange")} className="outline-none py-3 px-7 rounded-full text-black  shadow-lg" style={{backgroundColor:"orange"}}>orange</button>
        
        <button onClick={()=>setColor("purple")} className="outline-none py-3 px-7 rounded-full text-black  shadow-lg" style={{backgroundColor:"purple"}}>purple</button>
        
        <button onClick={()=>setColor("indigo")} className="outline-none py-3 px-7 rounded-full text-black  shadow-lg" style={{backgroundColor:"indigo"}}>indigo</button>
        
        <button onClick={()=>setColor("cyan")} className="outline-none py-3 px-7 rounded-full text-black  shadow-lg" style={{backgroundColor:"cyan"}}>cyan</button>
      </div>
     </div>
     </div>
    </>
  )
}

export default App
