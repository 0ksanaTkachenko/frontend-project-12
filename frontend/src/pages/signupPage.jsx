import avatarImg from '@assets/avatar_1-D7Cot-zE.jpg';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { createNewUser } from '@slices/authSlice';
import { useNavigate } from 'react-router-dom';
import MainCard from '@components/mainCard';
import {
  Formik,
  Form,
  Field,
  ErrorMessage
} from 'formik';
import { t } from '@utils/i18n';
import getValidationSchema from '@utils/validationSchema';
import routes from '@utils/routes';

const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loadingStatus = useSelector((state) => state.loadingStatus);

  const onSubmit = async ({ username, password }, { setErrors }) => {
    try {
      const newUser = { username, password };
      const response = await dispatch(createNewUser(newUser)).unwrap();

      if (response.token) {
        navigate(routes.home);
      }
    } catch (error) {
      if (error.message.includes('409')) {
        setErrors({ username: t('errors.userExists') });
      } else {
        setErrors({ username: t('errors.errorOccurred') });
      }
    }
  };

  return (
    <Formik
      initialValues={{ username: '', password: '', reEnteredPassword: '' }}
      validationSchema={getValidationSchema('signupPage')}
      onSubmit={onSubmit}>
      {({ errors, touched }) => (
        <Form className="text-center">
          <h1 className="mb-4">{t('auth.register')}</h1>
          <div className="form-floating mb-3">
            <Field
              autoFocus
              id="username"
              name="username"
              type="text"
              placeholder={t('validation.usernameRequired')}
              className={`form-control ${errors.username && touched.username ? 'is-invalid' : ''}`}
            />
            <label htmlFor="username">{t('auth.username')}</label>
            <ErrorMessage name="username" component="div" className="invalid-feedback" />
          </div>
          <div className="form-floating mb-4">
            <Field
              id="password"
              name="password"
              type="password"
              placeholder={t('validation.passwordRequired')}
              className={`form-control ${errors.password && touched.password ? 'is-invalid' : ''}`}
            />
            <label htmlFor="password">{t('auth.password')}</label>
            <ErrorMessage name="password" component="div" className="invalid-feedback" />
          </div>
          <div className="form-floating mb-4">
            <Field
              id="reEnteredPassword"
              name="reEnteredPassword"
              type="password"
              placeholder={t('validation.reEnteredPasswordRequired')}
              className={`form-control ${errors.reEnteredPassword && touched.reEnteredPassword ? 'is-invalid' : ''}`}
            />
            <label htmlFor="reEnteredPassword">{t('auth.confirmPassword')}</label>
            <ErrorMessage name="reEnteredPassword" component="div" className="invalid-feedback" />
          </div>
          <button type="submit" disabled={loadingStatus === 'loading'} className="btn btn-outline-primary mb-3 w-100">
            {t('auth.signUp')}
          </button>
        </Form>
      )}
    </Formik>
  );
};

const SignupPage = () => {
  return (
    <MainCard img={avatarImg}>
      <SignupForm />
    </MainCard>
  );
};

export default SignupPage;
