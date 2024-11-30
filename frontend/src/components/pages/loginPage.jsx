import { Formik, Form, Field} from 'formik';
import * as Yup from 'yup';
import avatarImg from '@assets/avatar-DIE1AEpS.jpg'
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';


const LoginForm = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const {token, error} = useSelector((state) => state.auth);

    const validationSchema = Yup.object({
        username: Yup.string().min(3, 'Ник должен содержать не менее 3 символов'),
        password: Yup.string().min(3, 'Пароль должен содержать не менее 3 символов'),
    });

    const onSubmit = (values) => {
        dispatch(loginUser(values))
        .then(() => {
            if (token) {
                localStorage.setItem('authToken', token);
                navigate('/');
            }
        })
    };
   
    return (
        <Formik initialValues={{ username: '', password: '' }} validationSchema={validationSchema} onSubmit={onSubmit}>
        {() => (
            <Form className='text-center'>
                <h1 className='mb-4'>Войти</h1>
                <div className="form-floating mb-3">
                    <Field id="username" name="username" type="text" className={`form-control ${error ? 'is-invalid' : ''}`} placeholder="Ваш ник"/>
                    <label htmlFor="username">Ваш ник</label>
                </div>
                <div className="form-floating mb-4">
                    <Field id="password" required className={`form-control ${error ? 'is-invalid' : ''}`} name="password" type="password" placeholder="Пароль" />
                    <label htmlFor="username">Пароль</label>
                    {error && <div className="alert alert-danger p-0">Неверные имя пользователя или пароль</div>}
                </div>
                <button type="submit" className='btn btn-outline-primary mb-3 w-100'>Войти</button> 
            </Form>
        )}
        </Formik>
    )

}

const LoginPage = () => {
    return (
        <div className='container-fluid h-100'>
            <div className='row justify-content-center align-content-center h-100'>
                <div className='col-12 col-md-8 col-xxl-6'>
                    <div className="card shadow-sm">
                        <div className="card-body row p-5">
                            <div className="col-md-6 d-flex justify-content-center align-items-center">
                                <img src={avatarImg} className="rounded-circle" alt="avatarImg"/>
                            </div>
                            <div className="col-md-6">
                                <div className="card-body">
                                    <LoginForm/>
                                </div>
                            </div>
                        </div>
                        <div className='card-footer p-4'>
                            <div className="text-center">
                                <span>Нет аккаунта? </span> 
                                <a href="/signup">Регистрация</a>
                            </div>
                        </div>
                    </div>
                </div>        
            </div>
        </div>
    ) 
};

export default LoginPage