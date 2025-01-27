import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { useEffect } from 'react';
import { t } from '@src/i18n';

const ChannelForm = ({
  action,
  title,
  initialChannelName,
  onSubmit,
  validationSchema,
  onClose,
  submitBtnTitle,
  setFormReset,
  inputModalRef,
}) => {
  return (
    <Formik
      initialValues={{ channelName: initialChannelName }}
      enableReinitialize
      validationSchema={validationSchema}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={async (values, { resetForm }) => {
        await onSubmit(values);
        resetForm();
        onClose();
      }}
    >
      {({ errors, touched, resetForm }) => {
        useEffect(() => {
          if (setFormReset) {
            setFormReset(resetForm);
          }
        }, [setFormReset, resetForm]);

        return (
          <Form>
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={() => {
                  resetForm();
                  onClose();
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
                    innerRef={inputModalRef}
                    id="channelName"
                    name="channelName"
                    type="text"
                    autoFocus
                    className={`form-control ${
                      errors.channelName && touched.channelName
                        ? 'is-invalid'
                        : ''
                    }`}
                  />

                  <ErrorMessage
                    name="channelName"
                    component="div"
                    className="invalid-feedback"
                  />
                </>
              )}
              {action === 'delete' && (
                <p className="lead">{t('general.areYouSure')}</p>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary me-2"
                onClick={() => {
                  resetForm();
                  onClose();
                }}
              >
                {t('general.cancel')}
              </button>
              <button
                type="submit"
                className={`btn ${
                  action === 'delete' ? 'btn-danger' : 'btn-primary'
                }`}
              >
                {submitBtnTitle}
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ChannelForm;
