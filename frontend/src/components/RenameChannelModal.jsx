import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import addChannelSchema from '../schemas/channelNameSchema.js';
import { getChannelsNames, renameChannel as renameChannelStore } from '../slices/channelsSlice.js';
import useChat from '../hooks/useChat.js';

const RenameChannelModal = ({
  show, handleClose, channelId, notify,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isAlreadyExist, setAlreadyExist] = useState(false);
  const { renameChannel } = useChat();
  const input = useRef(null);
  const channelsNames = useSelector(getChannelsNames);
  const [isBlocked, setBlocked] = useState(false);

  useEffect(() => {
    if (input.current) {
      input.current.focus();
    }
  });

  const checkIsInputAlreadyExist = (value) => {
    if (channelsNames.includes(value)) {
      setAlreadyExist(true);
      return true;
    }

    setAlreadyExist(false);
    return false;
  };

  const onSubmit = (values, { resetForm }) => {
    if (!checkIsInputAlreadyExist(values.name)) {
      setBlocked(true);
      renameChannel(values.name, channelId, () => {
        dispatch(renameChannelStore({ id: channelId, changes: { name: values.name } }));
        setBlocked(false);
        resetForm();
        notify();
        handleClose();
      });
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
  }, []);

  return (
    <Modal size="lg" centered show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.renameChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name" className="mb-3">
            <Form.Label className="visually-hidden">{t('form.channelName')}</Form.Label>
            <Form.Control
              type="text"
              value={values.name}
              placeholder={t('form.channelNewName')}
              onChange={handleChange}
              isInvalid={touched.name && (errors.name || isAlreadyExist)}
              ref={input}
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
            <Button variant="secondary" onClick={handleClose}>
              {t('modal.cancel')}
            </Button>
            <Button type="submit" variant="primary" disabled={isBlocked}>
              {t('modal.rename')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannelModal;
