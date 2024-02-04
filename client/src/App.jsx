import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/auth/Home';
import Main from './pages/home/Home';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import SinglePost from './components/singlePost/SinglePost';
import Email from './pages/auth/forget_pass/Email';
import Error from './pages/Error';
import Reset from './pages/auth/forget_pass/Reset';

const App = () => {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Main />} />
        <Route path='/single-post/:id' element={<SinglePost />} />
        <Route path='/forget-pass' element={<Email />} />
        <Route path='reset-password/:token' element={<Reset />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  )
}

export default App