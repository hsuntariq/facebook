import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/auth/Home';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App