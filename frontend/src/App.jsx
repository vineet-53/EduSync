import { Route, Routes } from 'react-router-dom'
import Home from "./pages/Home"
import Login from './pages/Login'
import Signup from "./pages/Signup"
import { Navbar } from './components/common'
import About from "./pages/About"
import VerifyEmail from './pages/VerifyEmail'
import OpenRoute from "./components/common/auth/OpenRoute"
import PrivateRoute from "./components/common/auth/PriivateRoute"
import Dashboard from './pages/Dashboard'
import ResetPassword from './pages/ResetPassword'
import UpdatePassword from './pages/UpdatePassword'
import Error from "./pages/Error"
import MyProfile from './components/main/Dashboard/outlets/MyProfile'
import EnrolledCourses from './components/main/Dashboard/outlets/EnrolledCourses'
import Wishlist from './components/main/Dashboard/outlets/Wishlist'
import Cart from './components/main/Dashboard/outlets/Cart'
import Settings from './components/main/Dashboard/outlets/Settings.jsx'
function App() {
  return (
    <>
      <Navbar />
      <Routes >
        <Route path={"/"} element={
          <OpenRoute>
          <Home />
          </OpenRoute>
        }
        />


        <Route path={"/login"} element={
          <OpenRoute>
            <Login />
          </OpenRoute>
        } />
        <Route path={"/about"} element={
          <OpenRoute>
            <About />
          </OpenRoute>
        } />
        <Route path={"/signup"} element={
          <OpenRoute>
            <Signup />
          </OpenRoute>

        } />
        <Route path={"/verify-email"} element={
          <OpenRoute>
            <VerifyEmail />
          </OpenRoute>
        } />
        <Route path={"/forgot-password"} element={
          <OpenRoute>
            <ResetPassword />
          </OpenRoute>
        } />


        <Route path={"/update-password/:token"} element={
          <OpenRoute>
            <UpdatePassword />
          </OpenRoute>
        } />
        <Route path={"/dashboard"} element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } >
          <Route path='my-profile' element={<MyProfile />} />
          <Route path='enrolled-courses' element={<EnrolledCourses />} />
          <Route path='cart' element={<Cart />} />
          <Route path='wishlist' element={<Wishlist />} />
          <Route path='settings' element={<Settings />} ></Route>
          

        </Route>
        <Route path={"/"} element={
          <OpenRoute>
            <Home />
          </OpenRoute>
        }

        />
        <Route path='*' element={<Error />} />

      </Routes>
    </>
  )
}
export default App