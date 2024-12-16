import {  } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Pages/Login'
import Main from './Pages/Main'
import Join from './Pages/Join'
import ListPage from './Pages/ListPage'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Main />}> </Route>
        <Route path='/login' element={<Login />}> </Route>
        <Route path='/join' element={<Join />}> </Route>
        <Route path='/list' element={<ListPage />}> </Route>
      </Routes>
    </>
  )
}

export default App
