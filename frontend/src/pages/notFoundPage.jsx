import notFoundImj from '@assets/404-D_FLHmTM.svg';
import { t } from '@utils/i18n';
import routes from '@utils/routes';

const NotFoundPage = () => {
  return (
    <div className="h-100 text-center">
      <img className="h-50" src={notFoundImj} alt="notFoundImj" />
      <h1 className="text-muted">{t('general.notFoundTitle')}</h1>
      <p className="text-muted">
        {t('general.notFoundMessage')}{' '}
        <a href={routes.home}>{t('general.mainPageLink')}</a>
      </p>
    </div>
  );
};

export default NotFoundPage;
