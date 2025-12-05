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
import EventsPage from './Pages/Event/EventsPage.jsx'
import User from './Pages/User/User.jsx'
import EventDetails from './Pages/Event/EventDetails.jsx'
import PrivateRoute from './Routes/PrivateRoute.jsx'


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
          path: 'register',
          Component: Register,
        }
        , {
          path: 'login',
          Component: Login,
        }
        , {
          path: 'events',
          Component: EventsPage,
        },
        {
          path: "events/:id",
          Component: EventDetails,
        }
        ,
        {
          path: 'create-event',
          element: <PrivateRoute><CreateEvent /></PrivateRoute>,
        },
        {
          path: 'user',
          Component: User,
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
