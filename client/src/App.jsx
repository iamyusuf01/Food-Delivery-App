import {  Route, Routes } from "react-router"
import Home from "./pages/Home"
import Login from "./auth/Login"
import Signup from "./auth/Signup"
import ForgetPassword from "./auth/ForgetPassword"
import Verification from "./auth/Verification"

function App() {

  return (
    <div>
      <Routes>
      {/* Authentication Routes */}
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/forget-password" element={<ForgetPassword/>}/>
        <Route path="/verification" element={<Verification/>}/>
      
      </Routes>
    </div>
  )
}

export default App
