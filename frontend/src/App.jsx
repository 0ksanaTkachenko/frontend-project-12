import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ChatPage from '@pages/chatPage';
import LoginPage from '@pages/loginPage';
import NotFoundPage from '@pages/notFoundPage';
import NavBar from '@components/navBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignupPage from '@pages/signupPage';
import { useSelector } from 'react-redux';
import NotificationManager from '@components/notifications';

function App() {
  const token = useSelector((state) => state.auth.token);

  return (
    <BrowserRouter>
        <NotificationManager />
          <div className="app-container d-flex flex-column vh-100">
              <div className='nav-container'>
                <NavBar token={token} />
              </div>
              <div className='page-container'>
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route
                path="/"
                element={token ? <ChatPage /> : <Navigate to="/login" />}
                />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>  
                  
              </div>
            
            
        </div>
    </BrowserRouter>
  );
}

export default App;
