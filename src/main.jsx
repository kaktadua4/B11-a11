import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import AuthProvider from './Context/AuthProvider.jsx'
import Router from './Route/Route.jsx'
import Home from './Pages/Home/Home.jsx'
import Erorr from './Pages/Erorr/Erorr.jsx'
import CreateEvent from './Pages/CreateEvent/CreateEvent.jsx'
import Register from './Pages/Register/Register.jsx'
import Login from './Pages/Login/Login.jsx'

const router = createBrowserRouter(
  [
    {
      path: '/',
      Component: Router,
      children: [
        {
          index: true,
          Component: Home,
        },
        {
          path :'create-event',
          Component: CreateEvent,
        },{
          path:'register',
          Component: Register,
        }
        ,{
          path:'login',
          Component: Login,
        }
      ]
    },
    {
      path: '/*',
      Component: Erorr,
    },
  ],);



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}>

    </RouterProvider>
    </AuthProvider>
  </StrictMode>,
)
