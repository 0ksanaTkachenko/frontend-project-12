import * as Yup from 'yup';
import { t } from '@utils/i18n';

const getValidationSchema = (kindOfform, action = '', chatChannels = []) => {
  const existingChannelNames =
    action === 'chatForm' && chatChannels.entities
      ? Object.values(chatChannels.entities).map((channel) => channel.name)
      : [];

  if (action === 'delete') return null;

  const shema = {
    chatForm: Yup.object({
      channelName: Yup.string()
        .min(3, t('validation.nameMinMax'))
        .max(20, t('validation.nameMinMax'))
        .required(t('validation.channelNameRequired'))
        .notOneOf(
          action === 'add' ? existingChannelNames : [],
          t('validation.channelNameExists'),
        ),
    }),
    loginPage: Yup.object({
      username: Yup.string()
        .min(3, t('validation.nameMinMax'))
        .max(20, t('validation.nameMinMax'))
        .required(t('validation.usernameRequired')),
      password: Yup.string().required(t('validation.passwordRequired')),
    }),
    signupPage: Yup.object({
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
    }),
  };

  return shema[kindOfform];
};

export default getValidationSchema;
