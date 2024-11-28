import { Formik, Form, Field} from 'formik';
import * as Yup from 'yup';
import avatarImg from '@assets/avatar-DIE1AEpS.jpg'


const LoginForm = () => {
    const validationSchema = Yup.object({
        username: Yup.string()
          .min(3, 'Ник должен содержать не менее 3 символов'),
        password: Yup.string()
          .min(6, 'Пароль должен содержать не менее 6 символов'),
      });


    const onSubmit = (values) => {
        console.log('Данные формы:', values);
    };

    return (
        <Formik initialValues={{ username: '', password: '' }} validationSchema={validationSchema} onSubmit={onSubmit}>
        {() => (
            <Form className='text-center'>
                <h1 className='mb-4'>Войти</h1>
                <div className="form-floating mb-3">
                    <Field id="username" required className="form-control" name="username" placeholder="Ваш ник" />
                    <label htmlFor="username">Ваш ник</label>
                </div>
                <div className="form-floating mb-4">
                    <Field id="password" required className='form-control' name="password" type="password" placeholder="Пароль" />
                    <label htmlFor="username">Пароль</label>
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