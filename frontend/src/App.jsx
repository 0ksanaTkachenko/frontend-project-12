import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ChatPage from './components/pages/chatPage';
import LoginPage from './components/pages/loginPage';
import NotFoundPage from './components/pages/notFoundPage';
import NavBar from './components/navBar';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const token = localStorage.getItem('authToken');

  return (
      <>
          <NavBar />
          <BrowserRouter>
              <Routes>
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/" element={token ? <ChatPage /> : <Navigate to="/login" />}/>
                  <Route path="*" element={<NotFoundPage />} />
              </Routes>
          </BrowserRouter>
      </>
  );
}

export default App
