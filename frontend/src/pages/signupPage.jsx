import avatarImg from '@assets/avatar_1-D7Cot-zE.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { createNewUser } from '@slices/authSlice';
import { useNavigate } from 'react-router-dom';
import MainCard from '@components/mainCard';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { t } from '@src/i18n';

const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loadingStatus = useSelector((state) => state.loadingStatus);

  const onSubmit = async ({ username, password }, { setErrors }) => {
    try {
      const newUser = { username, password };
      const response = await dispatch(createNewUser(newUser)).unwrap();

      if (response.token) {
        navigate('/');
      }
    } catch (error) {
      if (error.message.includes('409')) {
        setErrors({ username: t('errors.userExists') });
      } else {
        setErrors({ username: t('errors.errorOccurred') });
      }
    }
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, t('validation.nameMinMax'))
      .max(20, t('validation.nameMinMax'))
      .required(t('validation.usernameRequired')),
    password: Yup.string()
      .min(6, t('validation.passwordMin'))
      .required(t('validation.passwordRequired')),
    reEnteredPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], t('validation.passwordMismatch'))
      .required(t('validation.reEnteredPasswordRequired')),
  });

  return (
    <Formik
      initialValues={{ username: '', password: '', reEnteredPassword: '' }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
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
            <ErrorMessage
              name="username"
              component="div"
              className="invalid-feedback"
            />
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
            <ErrorMessage
              name="password"
              component="div"
              className="invalid-feedback"
            />
          </div>
          <div className="form-floating mb-4">
            <Field
              id="reEnteredPassword"
              name="reEnteredPassword"
              type="password"
              placeholder={t('validation.reEnteredPasswordRequired')}
              className={`form-control ${
                errors.reEnteredPassword && touched.reEnteredPassword
                  ? 'is-invalid'
                  : ''
              }`}
            />
            <label htmlFor="reEnteredPassword">
              {t('auth.confirmPassword')}
            </label>
            <ErrorMessage
              name="reEnteredPassword"
              component="div"
              className="invalid-feedback"
            />
          </div>
          <button
            type="submit"
            disabled={loadingStatus === 'loading'}
            className="btn btn-outline-primary mb-3 w-100"
          >
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
