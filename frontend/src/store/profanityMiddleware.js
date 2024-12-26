import leoProfanity from 'leo-profanity';

leoProfanity.loadDictionary('ru');
leoProfanity.loadDictionary('en');
leoProfanity.add(leoProfanity.getDictionary('ru'));
leoProfanity.add(leoProfanity.getDictionary('en'));

// eslint-disable-next-line no-unused-vars
const profanityMiddleware = (_store) => (next) => (action) => {
  if (
    [
      'channels/addSocketChannel',
      'channels/updateSocketChannel',
      'messages/addSocketMessage',
    ].includes(action.type)
  ) {
    const fieldToClean = action.type.startsWith('channels') ? 'name' : 'body';
    const cleanValue = leoProfanity.clean(action.payload[fieldToClean]);

    const updatedAction = {
      ...action,
      payload: {
        ...action.payload,
        [fieldToClean]: cleanValue,
      },
    };

    return next(updatedAction);
  }

  return next(action);
};

export default profanityMiddleware;
