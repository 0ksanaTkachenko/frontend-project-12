import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '@slices/authSlice';
import { t } from '@utils/i18n';
import routes from '@utils/routes';

const NavBar = ({ token = null }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const handleClick = () => {
    dispatch(logout());
    navigate(routes.home);
  };

  const handleLinkClick = (event) => {
    if (location.pathname === routes.home) {
      event.preventDefault();
    }
  };

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <Link
          className="navbar-brand"
          to={routes.home}
          onClick={handleLinkClick}
        >
          Hexlet Chat
        </Link>
        {token && (
          <button
            type="button"
            onClick={handleClick}
            className="btn btn-primary"
          >
            {t('auth.logout')}
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
