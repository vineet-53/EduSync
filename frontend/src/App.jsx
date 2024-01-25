import { Route, Routes, json } from 'react-router-dom'
import Home from "./pages/Home"
import Login from './pages/Login'
import Signup from "./pages/Signup"
import { Navbar } from './components/common'
import About from "./pages/About"
import VerifyEmail from './pages/VerifyEmail'
import { useSelector } from 'react-redux'
import Dashboard from './pages/Dashboard'
const Layout = ({children}) => { 
  return <>
    <Navbar/> 
    {children}
  </>
}
function App() {
  const {token} = useSelector(state => state.auth)
  const user = JSON.parse(localStorage.getItem('token')) || null
  return (
        <>
          <Routes > 
            <Route  path= {"/"} element={
              (token && user) ? <>
                <Dashboard/>
              </>
              :<Layout><Home /></Layout>
            } /> 
            <Route  path= {"/login"} element={<Layout><Login /></Layout>} /> 
            <Route  path= {"/about"} element={<Layout><About /></Layout>} /> 
            <Route  path= {"/signup"} element={<Layout><Signup /></Layout>} /> 
            <Route  path= {"/verify-email"} element={<VerifyEmail />} /> 
          </Routes>
        </>
  )
}
export default App