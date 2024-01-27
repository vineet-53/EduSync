import { Route, Routes } from 'react-router-dom'
import Home from "./pages/Home"
import Login from './pages/Login'
import Signup from "./pages/Signup"
import { Navbar } from './components/common'
import About from "./pages/About"
import VerifyEmail from './pages/VerifyEmail'
import { useSelector } from 'react-redux'
import OpenRoute from "./components/common/auth/OpenRoute"
import PrivateRoute from "./components/common/auth/PriivateRoute"
import Dashboard from './pages/Dashboard'
import ResetPassword from './pages/ResetPassword'
import UpdatePassword from './pages/UpdatePassword'
import Error from "./pages/Error"
const Layout = ({children}) => { 
  return <>
    <Navbar/> 
    {children}
  </>
}
function App() {
  return (
        <>
          <Routes > 
            <Route  path= {"/"} element={
                <OpenRoute>
                  <Layout><Home /></Layout>
                </OpenRoute>
            } 
            
            /> 
            <Route  path= {"/login"} element={
             <OpenRoute>
              <Layout><Login /></Layout>
            </OpenRoute>
            } /> 
            <Route  path= {"/about"} element={
              <OpenRoute>
                  <Layout><About /></Layout>
              </OpenRoute>
            } /> 
            <Route  path= {"/signup"} element={
             <OpenRoute>
              <Layout><Signup /></Layout>
            </OpenRoute>
            
            } /> 
            <Route  path= {"/verify-email"} element={
             <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
            } /> 
            <Route  path= {"/forgot-password"} element={
             <OpenRoute>
              <ResetPassword />
            </OpenRoute>
            } /> 
            
            <Route  path= {"/dashboard/my-profile"} element={
              <PrivateRoute> 
                <Layout><Dashboard /></Layout>
              </PrivateRoute>
            } /> 
            <Route  path= {"/update-password/:token"} element={
              <OpenRoute> 
                <UpdatePassword />
              </OpenRoute>
            } />
            <Route path='*' element={<Error />}/>  

          </Routes>
        </>
  )
}
export default App