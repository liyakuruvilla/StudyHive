import { useState } from 'react'
import axios from 'axios'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './Login'
import SideBar from './navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Quiz from './quiz/quiz'

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className='container'>
    <Router>
      <SideBar />
      Welcome to StudyHive
      <div className="page-content">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path='/quiz' element={<Quiz/>}/>

        </Routes>
      </div>
    </Router>
    </div>
  );
}

export default App;