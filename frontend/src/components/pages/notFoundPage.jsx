import notFoundImj from '@assets/404-D_FLHmTM.svg';

const NotFoundPage = () => (
    <div className='h-100 text-center'>
        <img className='h-50' src={notFoundImj} alt="notFoundImj" />
        <h1 className='text-muted'>Страница не найдена</h1>
        <p className='text-muted'>
            Но вы можете перейти <a href="/">на главную страницу</a>
        </p>
    </div>
);

export default NotFoundPage