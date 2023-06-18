import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import UserPublicRoute from './routes/UserPublicRoute';
import UserProtectRouter from './routes/UserProtectedRoute';
import { Toaster } from 'react-hot-toast'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Navigate } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster position='top-center' />
        <Routes>
          <Route path='/' element={<Navigate to="/profile" />} />
          <Route path='/profile' element={<UserPublicRoute><Profile /></UserPublicRoute>} />
          <Route path='/login' element={<UserProtectRouter><Login /></UserProtectRouter>} />
          <Route path='/register' element={<UserProtectRouter><Signup /></UserProtectRouter>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;