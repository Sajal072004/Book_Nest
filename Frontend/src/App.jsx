// import Course from "./components/Course"
import Signup from "./components/Signup"
import Courses from "./courses/Courses"
import Home from "./home/Home"
import {Navigate, Route,Routes} from "react-router-dom"
import  { Toaster } from 'react-hot-toast';
import { useAuth } from "../context/AuthProvider.jsx";



function App() {
  const [authUser]=useAuth();
    console.log(authUser);

  return (
    <>
    <div className="dark:bg-slate-900 dark:text-white">
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path='/course' element={authUser?<Courses/>:<Navigate to="/signup"/>}/>
      <Route path='/signup' element={<Signup/>}/>

    </Routes>
    <Toaster />
    </div>
    
    </>
    
  )
}

export default App
