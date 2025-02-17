import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from '../Layout.jsx'
import Home from './Pages/Home/Home.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import Login from './Pages/Login/Login.jsx'
import Signup from './Pages/Signup/Signup.jsx'
import Cources from './Pages/Cources/Cources.jsx'
import Dashboard from './Pages/Dashboard/Dashboard.jsx'
import './index.css'
import Todo from './Pages/Todo/Todo.jsx'
import ProtectedRoute from './Components/ProtectedRoute.jsx'
import EnrolledCourses from './Pages/EnroledCources/EnrolledCourses.jsx'
import About from './Pages/About/About.jsx'
import DashBoardAbout from './Pages/DashBoardAbout/DashBoardAbout.jsx'
import Contact from './Pages/Contect/Contact.jsx'
import EnroleCourses from './Pages/EnroleCources/EnroleCources.jsx'
import Update from './Pages/Update/Update.jsx'
import Exam from './Pages/Exam/Exam.jsx'
const router = createBrowserRouter([
  {
    path:'/',
    element:<Layout/>,
    
    children:[
      {
        path:'',
        element:<Home/>
      }
      ,{
        path:"/login",
        element:<Login/>
      },{
        path:"/signup",
        element:<Signup/>
      },{
        path:"/courses",
        element:<Cources/>
      },{
        path:"/about",
        element:<About/>
      },{
        path:"/contact",
        element:<Contact/>
      },
    ]
  },
  {
    path:"/dashboard",
    element:<ProtectedRoute>
    <Dashboard/>
  </ProtectedRoute>,
    children:[
      {
        path:'todo',
        element:(
          <ProtectedRoute>
            <Todo/>
          </ProtectedRoute>
        )
      },{
        path:"/dashboard/enroled/me",
        element:(
          <ProtectedRoute>
            <EnrolledCourses/>
          </ProtectedRoute>
        )
      },{
        path:"/dashboard/About",
        element:(
          <ProtectedRoute>
            <DashBoardAbout/>
          </ProtectedRoute>
        )
      },{
        path:"/dashboard/Cources",
        element:(
          <ProtectedRoute>
            <EnroleCourses/>
          </ProtectedRoute>
        )
      },
      {
        path:"/dashboard/Update",
        element:(
          <ProtectedRoute>
            <Update/>
          </ProtectedRoute>
        )
      },{
        path:"/dashboard/Exam",
        element:(
          <ProtectedRoute>
            <Exam/>
          </ProtectedRoute>
        )
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
