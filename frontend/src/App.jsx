import { useState } from 'react'
import Header from './components/Header'
import Create from './components/Create'
import Profile from './components/Profile'
import Error from './components/Error'
import Login from './components/Login'
import Home from './components/Home'
import Register from './components/Register'
import { createBrowserRouter,Outlet } from 'react-router-dom'
import ForgotPassword from './components/ForgotPassword'
import ResetPassword from './components/ResetPassword'
import { AuthProvider } from './context/AuthContext'
import ViewList from './components/ViewList'
import ViewUpdate from './components/ViewUpdate'
import ViewPublic from './components/ViewPublic'
import Unauthorized from './components/Unauthorized'
function App() {
  const [count, setCount] = useState(true)
  // const token=useLongIn()
  return (
    <>
    
    <div className="bg-slate-900 text-white overflow-hidden font-display">
    <AuthProvider>
    <Header/>
     <Outlet/>
     </AuthProvider>
    </div>
    
    </>
  )
}
export const appRouter=createBrowserRouter([{
  path:"/",
  element:<App/>,
  errorElement:<Error/>,
  children:[
    {
      path:"/",
      element:<Home/>
    },
    {
      path:'/signup',
      element:<Register/>
    },
    {
      path:'/login',
      element:<Login/>
    },
   {
    path:'/forgotpassword',
    element:<ForgotPassword/>
   },
    {
    path:'/auth/reset-password/:resetToken',
    element:<ResetPassword/>
    },
    {
      path:"/create",
      element:<Create/>
    },
    {
      path:"/view",
      element:<ViewList/>
    },
    {
      path:"/viewupdate/:viewId",
      element:<ViewUpdate/>
    },
    {
      path:"/profile",
      element:<Profile/>
    }
  ]
},
{
    path:"/public/:viewId",
    element:<ViewPublic/>,
    errorElement:<Error/>
},
,
    {
      path:'/unauthorized',
      element:<Unauthorized/>,
    errorElement:<Error/>
    }

])
export default App
