import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ChatPage from '@pages/chatPage';
import LoginPage from '@pages/loginPage';
import NotFoundPage from '@pages/notFoundPage';
import NavBar from '@components/navBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignupPage from '@pages/signupPage';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

function App() {
    const token = useSelector((state) => state.auth.token);
    const dispatch = useDispatch();

    useEffect(() => {
        if (token) {
            dispatch({ type: 'socket_connect' });
        }
       
        return () => {
            if (!token) {
                dispatch({ type: 'socket_disconnect' });
            }
        };
      }, [token, dispatch]);
    
  return (
      <>
          <BrowserRouter>
              <NavBar token={token}/>
              <Routes>
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/" element={token ? <ChatPage /> : <Navigate to="/login" />} />
                  <Route path="/signup" element={<SignupPage />} />
                  <Route path="*" element={<NotFoundPage />} />  
              </Routes>
          </BrowserRouter>
      </>
  );
}

export default App
