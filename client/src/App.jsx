import './App.css'
import Homepage from './components/Homepage'
import Login from './components/Login'
import AddUserModal from './components/AddUserModal'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Orgview from './components/Orgview'
import UserDetails from './components/UserDetails'
import Signup from './components/Signup'
import ChangePassword from './components/ChangePassword'


function App() {


  return (
    <BrowserRouter>
    <Routes>
      <Route path='/signup' element={<Signup />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/' element={<Homepage />}></Route>
      <Route path='/org/:id' element={<Orgview />}></Route>
      <Route path='/add' element={<AddUserModal />}></Route>
      <Route path='/user/:id' element={<UserDetails />}></Route>
      <Route path='/change_password/:id' element={<ChangePassword />}></Route>
    </Routes>
  </BrowserRouter>
  
  )
}

export default App
