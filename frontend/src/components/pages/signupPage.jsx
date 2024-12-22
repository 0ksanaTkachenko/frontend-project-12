import avatarImg from '@assets/avatar-DIE1AEpS.jpg'
import { useDispatch, useSelector } from 'react-redux';
import { createNewUser } from '@slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { MainCard } from '@components/helpers';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const SignupForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
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
            setErrors({ username: 'Пользователь с таким именем уже существует' });
          } else {
            setErrors({ username: 'Произошла ошибка. Попробуйте снова.' });
          }
        }
    };

    const validationSchema = Yup.object({
        username: Yup.string()
          .min(3, 'Ник должен содержать не менее 3 символов')
          .max(20, 'Ник должен содержать не больше 20 символов')
          .required('Введите ваш ник'),
        password: Yup.string()
          .min(6, 'Пароль должен содержать не менее 6 символов')
          .required('Введите ваш пароль'),
        reEnteredPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать')
          .required('Введите ваш пароль повторно'),
    });

  return (
    <Formik initialValues={{ username: '', password: '', reEnteredPassword: '' }} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ errors, touched }) => (
        <Form className="text-center">
          <h1 className="mb-4">Регистрация</h1>
          <div className="form-floating mb-3">
                <Field autoFocus id="username" name="username" type="text" placeholder="Имя пользователя"
                className={`form-control ${errors.username && touched.username ? 'is-invalid' : ''}`}
                />
                <label htmlFor="username">Имя пользователя</label>
                <ErrorMessage name="username" component="div" className="invalid-feedback" />
          </div>
          <div className="form-floating mb-4">
                <Field id="password" name="password" type="password" placeholder="Пароль"
                className={`form-control ${errors.password && touched.password ? 'is-invalid' : ''}`}
                />
                <label htmlFor="password">Пароль</label>
                <ErrorMessage name="password" component="div" className="invalid-feedback" />
          </div>
          <div className="form-floating mb-4">
            <Field
                id="reEnteredPassword" name="reEnteredPassword" type="password" placeholder="Подтвердите пароль"
                className={`form-control ${
                errors.reEnteredPassword && touched.reEnteredPassword ? 'is-invalid' : ''
                }`}
            />
            <label htmlFor="reEnteredPassword">Подтвердите пароль</label>
            <ErrorMessage name="reEnteredPassword" component="div" className="invalid-feedback" />
          </div>
          <button type="submit" disabled={loadingStatus === 'loading'} className="btn btn-outline-primary mb-3 w-100">
                Зарегистрироваться
          </button>
        </Form>
      )}
    </Formik>
  );
}

const SignupPage = () => {
    return (
        <MainCard img={avatarImg}>
            <SignupForm/>
        </MainCard>
    )  
}

export default SignupPage