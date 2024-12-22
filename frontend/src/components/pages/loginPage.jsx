import avatarImg from '@assets/avatar-DIE1AEpS.jpg'
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '@slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { MainCard } from '@components/helpers';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const loadingStatus = useSelector((state) => state.loadingStatus);

    const validationSchema = Yup.object({
        username: Yup.string()
          .min(3, 'Ник должен содержать не менее 3 символов')
          .max(20, 'Ник должен содержать не больше 20 символов')
          .required('Введите ваш ник'),
        password: Yup.string()
          .min(5, 'Пароль должен содержать не менее 5 символов')
          .required('Введите ваш пароль'),
    });

    const onSubmit = async (values) => {
        const response = await dispatch(loginUser(values)).unwrap();
        if (response.token) {
            navigate('/');
        }
    };

  return (
    <Formik initialValues={{ username: '', password: '' }} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ errors, touched }) => (
        <Form className="text-center">
          <h1 className="mb-4">Войти</h1>
          <div className="form-floating mb-3">
            <Field autoFocus id="username" name="username" type="text" placeholder="Ваш ник"
              className={`form-control ${errors.username && touched.username ? 'is-invalid' : ''}`}
            />
            <label htmlFor="username">Ваш ник</label>
            <ErrorMessage name="username" component="div" className="invalid-feedback" />
          </div>
          <div className="form-floating mb-4">
            <Field id="password" name="password" type="password" placeholder="Пароль"
              className={`form-control ${errors.password && touched.password ? 'is-invalid' : ''}`}
            />
            <label htmlFor="password">Пароль</label>
            <ErrorMessage name="password" component="div" className="invalid-feedback" />
          </div>
          <button type="submit" disabled={loadingStatus === 'loading'} className="btn btn-outline-primary mb-3 w-100">
            Войти
          </button>
        </Form>
      )}
    </Formik>
  );
}

const LoginPage = () => {
    const cardFooter = (
        <div className='card-footer p-4'>
            <div className="text-center">
                <span>Нет аккаунта? </span> 
                <a href="/signup">Регистрация</a>
            </div>
        </div>
    )

    return (
        <MainCard img={avatarImg} cardFooter={cardFooter}>
            <LoginForm/>
        </MainCard>
    )   
};

export default LoginPage