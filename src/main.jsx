import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'
import Home from './pages/Home/Home.jsx'
import BookAppointment from './pages/Appointment/Appointment.jsx'
import SkinQuiz from './pages/SkinQuiz/SkinQuiz.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path='' element={<Home />} />
      <Route path='/skinquiz' element={<SkinQuiz />} />
      <Route path='/bookappointment' element={<BookAppointment />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)