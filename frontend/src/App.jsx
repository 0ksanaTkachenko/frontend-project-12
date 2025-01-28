import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import ChatPage from '@pages/chatPage';
import LoginPage from '@pages/loginPage';
import NotFoundPage from '@pages/notFoundPage';
import NavBar from '@components/navBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignupPage from '@pages/signupPage';
import { useSelector } from 'react-redux';
import NotificationManager from '@components/notifications';
import routes from '@utils/routes';

const App = () => {
  const token = useSelector((state) => state.auth.token);

  return (
    <BrowserRouter>
      <NotificationManager />
      <div className="app-container d-flex flex-column vh-100">
        <div className="nav-container">
          <NavBar token={token} />
        </div>
        <div className="page-container">
          <Routes>
            <Route path={routes.login} element={<LoginPage />} />
            <Route
              path={routes.home}
              element={token ? <ChatPage /> : <Navigate to={routes.login} />}
            />
            <Route path={routes.signup} element={<SignupPage />} />
            <Route path={routes.notFound} element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
