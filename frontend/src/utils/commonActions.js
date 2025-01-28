import { t } from '@utils/i18n';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import {
 setSelectedChannelId, addChannel, editChannel, removeChannel 
} from '@slices/channelsSlice';
import scroll from '@utils/scroll';

const commonActions = (action, activeChannelId, chatChannels, chatContainerRef) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const selectedChannelId = useSelector((state) => state.channels.selectedChannelId);

  const actions = {
    add: {
      title: t('channels.addChannel'),
      submitBtnTitle: t('general.send'),
      initialChannelName: '',
      onSubmit: async (values) => {
        const newChannel = { name: values.channelName.trim() };
        const response = await dispatch(addChannel({ token, newChannel })).unwrap();
        await dispatch(setSelectedChannelId(response.id));
        scroll('bottom', chatContainerRef);
      },
    },
    rename: {
      title: t('channels.editChannel'),
      submitBtnTitle: t('general.send'),
      initialChannelName: chatChannels.entities[activeChannelId]?.name,
      onSubmit: async (values) => {
        const editedChannel = { name: values.channelName.trim() };
        await dispatch(editChannel({ token, activeChannelId, editedChannel }));
      },
    },
    delete: {
      title: t('channels.deleteChannel'),
      submitBtnTitle: t('general.delete'),
      initialChannelName: '',
      onSubmit: async () => {
        await dispatch(removeChannel({ token, activeChannelId }));
        if (activeChannelId === selectedChannelId) {
          scroll('top', chatContainerRef);
        }
      },
    },
  };

  return actions[action];
};

export default commonActions;
