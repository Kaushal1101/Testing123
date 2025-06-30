import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

// Import toastify for popup UI messages
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Header from './components/Header'
import HomePage from './pages/HomePage'
import Login from './pages/Login'
import Register from './pages/Register'
import EntryView from './pages/EntryView'

function App() {
  return (
    <>
    <Router>
        <div className='container'>
        <Header />
            <Routes>
                <Route path = '/' element = {<HomePage />} />
                <Route path = '/login' element = {<Login />} />
                <Route path = '/register' element = {<Register />} />
                <Route path = '/journal/:id' element = {<EntryView />} />
            </Routes>
        </div>
    </Router>
    <ToastContainer />
  </>
  );
}

export default App;