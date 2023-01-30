import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import useChat from '../hooks/useChat.js';
import addChannelSchema from '../schemas/channelNameSchema.js';
import { getChannelsNames } from '../slices/channelsSlice.js';

const AddChannelModal = ({ show, handleClose, notify }) => {
  const { t } = useTranslation();
  const [isAlreadyExist, setAlreadyExist] = useState(false);
  const [input, setInput] = useState(null);
  const { createChannel } = useChat();
  const channelsNames = useSelector(getChannelsNames);

  const checkIsInputAlreadyExist = (value) => {
    if (channelsNames.includes(value)) {
      setAlreadyExist(true);
      return true;
    }

    setAlreadyExist(false);
    return false;
  };

  const onSubmit = (values) => {
    if (!checkIsInputAlreadyExist(values.name)) {
      createChannel(values.name, () => {
        handleClose();
        notify();
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
  });

  useEffect(() => {
    if (input) {
      input.focus();
    }
  });

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
              ref={(c) => { setInput(c); }}

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
            <Button type="submit" variant="primary">
              {t('modal.add')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannelModal;
