import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ChatPage from './components/pages/chatPage';
import LoginPage from './components/pages/loginPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<LoginPage />} />
          <Route path="/" element={<ChatPage  />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
