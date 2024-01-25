import { Route, Routes } from 'react-router-dom'
import Home from "./pages/Home"
import Login from './pages/Login'
import Signup from "./pages/Signup"
import { Navbar } from './components/common'
import About from "./pages/About"
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
            <Route  path= {"/"} element={<Layout><Home /></Layout>} /> 
            <Route  path= {"/login"} element={<Layout><Login /></Layout>} /> 
            <Route  path= {"/about"} element={<Layout><About /></Layout>} /> 
            <Route  path= {"/signup"} element={<Layout><Signup /></Layout>} /> 
          </Routes>
        </>
  )
}
export default App