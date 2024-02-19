import { Route, Routes } from 'react-router-dom'
import Navbar from './components/main/navbar/Navbar.jsx'
import Home from "./pages/Home"
import Login from './pages/Login'
import Signup from "./pages/Signup"
import About from "./pages/About"
import VerifyEmail from './pages/VerifyEmail'
import { OpenRoute, PrivateRoute } from "./components/common"
import Dashboard from './pages/Dashboard'
import ResetPassword from './pages/ResetPassword'
import UpdatePassword from './pages/UpdatePassword'
import Error from "./pages/Error"
import MyProfile from './components/main/Dashboard/Profile/MyProfile.jsx'
import EnrolledCourses from './components/main/Dashboard/EnrolledCourses'
import Cart from './components/main/Dashboard/Cart/Cart.jsx'
import Settings from './components/main/Dashboard/Settings/Settings.jsx'
import Contactus from "./pages/Contactus.jsx"
import { MyCourses, AddCourse, Instructor } from "./components/main/Dashboard/Instructor"
import { ACCOUNT_TYPE } from './utils/constants.js'
import { useSelector } from 'react-redux'
function App() {
  const { user } = useSelector(state => state.profile)
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
          <About />
        } />
        <Route path={"/signup"} element={
          <OpenRoute>
            <Signup />
          </OpenRoute>

        } />
        <Route path={"/contact"} element={
          <Contactus />
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
          <Route path='settings' element={<Settings />} ></Route>
          {
            user?.accountType === ACCOUNT_TYPE.STUDENT &&
            <>
              <Route path='enrolled-courses' element={<EnrolledCourses />} />
              <Route path='cart' element={<Cart />} />
            </>
          }
          {
            user?.accountType === ACCOUNT_TYPE.INSTRUCTOR &&
            <>
              <Route path='add-course' element={<AddCourse />} />
              <Route path='my-courses' element={<MyCourses />} />
              <Route path='instructor' element={<Instructor />} />
            </>
          }
        </Route>
        <Route path={"/"} element={
          <OpenRoute>
            <Home />
          </OpenRoute>
        }
        />
        <Route path="/404-not-found" element={<Error />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </>
  )
}
export default App