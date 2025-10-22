import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './components/Signup.jsx'
import Login from './components/Login.jsx'
import {BrowserRouter, Route, Routes} from 'react-router'
function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>  
        <Route path="/register" element={<Signup/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
