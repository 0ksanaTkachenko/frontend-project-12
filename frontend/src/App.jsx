import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ChatPage from './components/pages/chatPage';
import LoginPage from './components/pages/loginPage';
import NotFoundPage from './components/pages/notFoundPage';
import NavBar from './components/navBar';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <NavBar/>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NotFoundPage />} /> 
          <Route path="login" element={<LoginPage />} />
          <Route path="/" element={<ChatPage  />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
