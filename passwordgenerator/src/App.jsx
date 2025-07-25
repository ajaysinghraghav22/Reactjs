import { useState, useCallback ,useEffect,useRef} from 'react'
import './App.css'
function App() {
  const [length, setlength] = useState(8)
  const [numallow, setnumallow] = useState(false)
  const [char, setchar] = useState(false)
  const [pass, setpass] = useState("")
  //usereff
  const passref=useRef(null)
  const passgen = useCallback(() => {//memoization by the usecallback
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWQYZabcdefghijklmnopq"
    if (numallow) str = str + "1234567890"
    if (char) str = str + "!@#$%^&*()_+{}:;?*-/"
    for (let i= 1; i<= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char) //setpassword
    }
    setpass(pass) //read password
  } , [length, numallow, char,setpass])//dependences if any change happens

useEffect(()=>{passgen()},[length,numallow,char,passgen])

const copyPasswordToclipboard=useCallback(() => {window.navigator.clipboard.writeText(pass)}, [pass])
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-4 my-8 text-orange-500  bg-gray-700 text-center' >  Generate password
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text"
            value={pass}
            className='outline-none w-full py-1 px-3 '
            placeholder='password'
            readOnly
            ref={passref} />

          <button className='aj' onClick={copyPasswordToclipboard} >Copy</button>

        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range"
              min={6}
              max={50}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { (setlength(e.target.value)) }} />
            <label >Length:{length}</label>
          </div>
          <div className='flex text-sm gap-x-2'>
            <input type="checkbox"
              defaultChecked={numallow} id="numberInput"
              onChange={() => {
                setnumallow((prev) => !prev);
              }} />
            <label htmlFor="">Numbers</label>
          </div>

          <div className='flex text-sm gap-x-2'>
            <input type="checkbox"
              defaultChecked={char} id="charInput"
              onChange={() => {
                setchar((prev) => !prev);
              }} />
            <label htmlFor="">SpecialCharacter</label>
          </div>

        </div>
      </div>
    </>
  )
}

export default App
