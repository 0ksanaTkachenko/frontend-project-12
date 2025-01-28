// import {
//   Formik,
//   Form,
//   Field,
//   ErrorMessage
// } from 'formik';
// import React, { useEffect } from 'react';
// import { t } from '@utils/i18n';
// import getValidationSchema from '@utils/validationSchema';

// const ChannelForm = ({ actionInfo, onHide, action, inputChatRef, chatChannels }) => {
//   const { title, submitBtnTitle, initialChannelName, onSubmit } = actionInfo;

//   useEffect(() => {
//     if (action === 'delete') {
//       return;
//     }
//     inputChatRef.current.focus();
//     inputChatRef.current.select();
//   }, []);

//   return (
//     <Formik
//       initialValues={{ channelName: initialChannelName }}
//       enableReinitialize
//       validationSchema={getValidationSchema('chatForm', action, chatChannels)}
//       validateOnChange={false}
//       validateOnBlur={false}
//       onSubmit={async (values, { resetForm }) => {
//         await onSubmit(values);
//         resetForm();
//         onHide();
//       }}>
//       {({ errors, touched, resetForm }) => {
//         return (
//           <Form>
//             <div className="modal-header">
//               <h5 className="modal-title">{title}</h5>
//               <button
//                 type="button"
//                 className="btn-close"
//                 aria-label="Close"
//                 onClick={() => {
//                   resetForm();
//                   onHide();
//                 }}
//               />
//             </div>
//             <div className="modal-body">
//               {action !== 'delete' && (
//                 <>
//                   <label htmlFor="channelName" className="visually-hidden">
//                     {t('channels.channelName')}
//                   </label>
//                   <Field
//                     innerRef={inputChatRef}
//                     id="channelName"
//                     name="channelName"
//                     type="text"
//                     autoFocus
//                     className={`form-control ${errors.channelName && touched.channelName ? 'is-invalid' : ''}`}
//                   />

//                   <ErrorMessage name="channelName" component="div" className="invalid-feedback" />
//                 </>
//               )}
//               {action === 'delete' && <p className="lead">{t('general.areYouSure')}</p>}
//             </div>
//             <div className="modal-footer">
//               <button
//                 type="button"
//                 className="btn btn-secondary me-2"
//                 onClick={() => {
//                   resetForm();
//                   onHide();
//                 }}>
//                 {t('general.cancel')}
//               </button>
//               <button type="submit" className={`btn ${action === 'delete' ? 'btn-danger' : 'btn-primary'}`}>
//                 {submitBtnTitle}
//               </button>
//             </div>
//           </Form>
//         );
//       }}
//     </Formik>
//   );
// };

// export default ChannelForm;


import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from 'formik';
import React, { useEffect } from 'react';
import { t } from '@utils/i18n';
import getValidationSchema from '@utils/validationSchema';

const ChannelForm = ({ 
  actionInfo, 
  onHide, 
  action, 
  inputChatRef, 
  chatChannels 
}) => {
  const { 
    title, 
    submitBtnTitle, 
    initialChannelName, 
    onSubmit 
  } = actionInfo;

  useEffect(() => {
    if (action === 'delete') {
      return;
    }
    inputChatRef.current.focus();
    inputChatRef.current.select();
  }, [action, inputChatRef]); 

  return (
    <Formik
      initialValues={{
        channelName: initialChannelName,
      }}
      enableReinitialize
      validationSchema={getValidationSchema('chatForm', action, chatChannels)}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={async (values, { resetForm }) => {
        await onSubmit(values);
        resetForm();
        onHide();
      }}
    >
      {({ errors, touched, resetForm }) => (
        <Form>
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={() => {
                resetForm();
                onHide();
              }}
            />
          </div>
          <div className="modal-body">
            {action !== 'delete' && (
              <>
                <label htmlFor="channelName" className="visually-hidden">
                  {t('channels.channelName')}
                </label>
                <Field
                  innerRef={inputChatRef}
                  id="channelName"
                  name="channelName"
                  type="text"
                  autoFocus
                  className={`form-control ${
                    errors.channelName && touched.channelName ? 'is-invalid' : ''
                  }`}
                />
                <ErrorMessage name="channelName" component="div" className="invalid-feedback" />
              </>
            )}
            {action === 'delete' && <p className="lead">{t('general.areYouSure')}</p>}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary me-2"
              onClick={() => {
                resetForm();
                onHide();
              }}
            >
              {t('general.cancel')}
            </button>
            <button
              type="submit"
              className={`btn ${action === 'delete' ? 'btn-danger' : 'btn-primary'}`}
            >
              {submitBtnTitle}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ChannelForm;
