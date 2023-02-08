import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import useChat from '../hooks/useChat.js';
import getChannelSchema from '../schemas/channelNameSchema.js';
import { getChannelsNames, changeCurrentChannel, addChannel } from '../slices/channelsSlice.js';
import toastsParams from '../toasts/toastsParams.js';

const AddChannelModal = ({
  show, handleClose,
}) => {
  const { t } = useTranslation();
  const { createChannel } = useChat();
  const dispatch = useDispatch();
  const channelsNames = useSelector(getChannelsNames);
  const [isBlocked, setBlocked] = useState(false);
  const [display, setDisplay] = useState(show);
  const input = useRef(null);

  const notifyError = (text) => toast.error(text, toastsParams.getDefaultParams());
  const notifySuccess = (text) => toast.success(text, toastsParams.getDefaultParams());

  const onSubmit = async (values) => {
    setBlocked(true);
    try {
      const data = await createChannel(values.name);
      const { id } = data;
      dispatch(addChannel(data));
      dispatch(changeCurrentChannel(id));
      setDisplay(false);
      notifySuccess(t('toastMessage.channelAdded'));
    } catch (err) {
      notifyError(t('errors.network'));
    } finally {
      setBlocked(false);
    }
  };

  const {
    values,
    handleChange,
    handleSubmit,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: getChannelSchema(channelsNames),
    onSubmit,
  });

  useEffect(() => {
    if (input.current) {
      input.current.focus();
      input.current.select();
    }
  }, [show]);

  return (
    <Modal
      size="lg"
      centered
      show={display}
      onHide={() => {
        setDisplay(false);
      }}
      onExited={() => {
        handleClose();
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.addChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name" className="mb-3">
            <Form.Label className="visually-hidden">{t('form.channelName')}</Form.Label>
            <Form.Control
              type="text"
              value={values.name}
              placeholder={t('form.channelName')}
              onChange={handleChange}
              isInvalid={touched.name && (errors.name)}
              ref={input}
              disabled={isBlocked}
              autoComplete="off"
            />
            {errors.name && (
              <Form.Control.Feedback type="invalid">
                {t(`form.${errors.name}`)}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={() => setDisplay(false)} disabled={isBlocked}>
              {t('modal.cancel')}
            </Button>
            <Button type="submit" variant="primary" disabled={isBlocked}>
              {t('modal.add')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannelModal;
