import { useState } from 'react'
import './App.css'
import { themeProvider } from './context/theme'
import Theme from './component/Theme'
import Cards from './component/Cards'


function App() {
  const [count, setCount] = useState(0)
  const[themeMode , setThemeMode] = useState("light")
  const lightTheme = {
   setThemeMode :("light")
  }
  const darkTheme = {
    setThemeMode :("dark ")
   }

  return (
    <themeProvider value ={{themeMode , darkTheme , lightTheme}}>
  
<div className="flex flex-wrap min-h-screen items-center">
                <div className="w-full">
                    <div className="w-full max-w-sm mx-auto flex justify-end mb-4">
                    <Theme/>
                    </div>

                    <div className="w-full max-w-sm mx-auto">
                    <Cards/>
                    </div>
                </div>
            </div>

    </themeProvider>
  )
}

export default App
