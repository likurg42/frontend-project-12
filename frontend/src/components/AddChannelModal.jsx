import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import useChat from '../hooks/useChat.js';
import addChannelSchema from '../schemas/channelNameSchema.js';
import { getChannelsNames, changeCurrentChannel, addChannel } from '../slices/channelsSlice.js';

const AddChannelModal = ({
  show, handleClose, notifySuccess, notifyError,
}) => {
  const { t } = useTranslation();
  const { createChannel } = useChat();
  const dispatch = useDispatch();
  const channelsNames = useSelector(getChannelsNames);
  const [isBlocked, setBlocked] = useState(false);
  const [isAlreadyExist, setAlreadyExist] = useState(false);
  const input = useRef(null);

  const checkIsInputAlreadyExist = (value) => {
    setBlocked(true);
    if (channelsNames.includes(value)) {
      setAlreadyExist(true);
      setBlocked(false);
      input.current.select();
      return true;
    }

    setAlreadyExist(false);
    setBlocked(false);
    return false;
  };

  const onSubmit = async (values, { resetForm }) => {
    if (!checkIsInputAlreadyExist(values.name)) {
      setBlocked(true);
      try {
        await createChannel(values.name, (res) => {
          const { id } = res.data;
          dispatch(addChannel(res.data));
          dispatch(changeCurrentChannel(id));
          handleClose();
          notifySuccess();
          resetForm();
        });
      } catch (err) {
        console.error(err);
        notifyError();
      } finally {
        setBlocked(false);
      }
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
    validationSchema: addChannelSchema,
    onSubmit,
  });

  useEffect(() => {
    values.name = '';
    if (input.current) {
      input.current.focus();
      input.current.select();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  return (
    <Modal size="lg" centered show={show} onHide={handleClose}>
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
              isInvalid={touched.name && (errors.name || isAlreadyExist)}
              ref={input}
              disabled={isBlocked}
              autoComplete="off"
            />
            {errors.name && (
              <Form.Control.Feedback type="invalid">
                {t(`form.${errors.name}`)}
              </Form.Control.Feedback>
            )}
            {isAlreadyExist && (
              <Form.Control.Feedback type="invalid">
                {t('form.channelNameAlreadyExist')}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={handleClose} disabled={isBlocked}>
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
