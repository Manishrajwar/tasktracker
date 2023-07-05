import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import AssignTask from './Pages/AssignTask';
import Tasks from './Pages/Tasks';
import Search from './Pages/Search';
import { useContext } from 'react';
import { AppContext } from './Context/AppContext';
import Dashboard from './Pages/Dashboard';

function App() {
  const {cookie } = useContext(AppContext);
  const userType = sessionStorage.getItem("userType");

  return (
   <div className='w-full h-full font-poppins'>

    {
      cookie.token ?(
        // login route
<Routes>

  {
    userType==="Admin"?(
      <Route path='/dashboard' element={<Dashboard />} />

      ):(
        <Route path='/task' element={<Tasks />} />
        )
      }
  
  <Route path='/search' element={<Search />} />
  <Route path='/assignTask' element={<AssignTask />} />
  {
    userType==="Admin"?(
      <Route path='*' element={<Dashboard />} />

      ):(
        <Route path='*' element={<Tasks />} />
        )
      }
</Routes>
      ):(
        // logout route
        <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<Login />} />
        </Routes>
      )
    }


   </div>
  );
}

export default App;
