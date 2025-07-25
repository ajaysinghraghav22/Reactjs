import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './components/Home/Home.jsx'
import LocalBus from './components/LocalBus/LocalBus.jsx'
import About from './components/About/About.jsx'
import Contact from './components/Contact/Contact.jsx'
import User from './components/User/User.jsx'
import Github from './components/Github/Github.jsx'
import FutureFeatures from './components/FutureInhance/Future.jsx'

const router =createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element ={<Layout/>} >
      <Route path='' element={<Home/>}></Route>
      <Route path='About' element={<About/>}></Route>
      <Route path='LocalBus' element={<LocalBus/>}></Route>
      <Route path='Contact' element={<Contact/>}></Route>
      <Route path='FutureFeatures' element={<FutureFeatures/>}></Route>
      <Route path='User/:userid' element={<User/>}></Route>
      <Route path='/Github' element={<Github/>}></Route>
      
      
    </Route>

  )
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
//creating router here  RouterProvider is a wrapper 
