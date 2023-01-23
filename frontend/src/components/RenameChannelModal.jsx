import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import useChatContext from '../contexts/chatContext.js';
import addChannelSchema from '../schemas/channelNameSchema.js';
import { getChannelsNames } from '../slices/channelsSlice.js';

const RenameChannelModal = ({
  show, handleClose, channelId, notify,
}) => {
  const { t } = useTranslation();
  const [isAlreadyExist, setAlreadyExist] = useState(false);
  const { renameChannel } = useChatContext();
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
      renameChannel(values.name, channelId, () => {
        handleClose();
        notify();
      });
    }
  };

  const {
    values,
    handleBlur,
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

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.renameChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name" className="mb-3">
            <Form.Label className="visually-hidden">{t('channels.rename')}</Form.Label>
            <Form.Control
              type="text"
              value={values.name}
              placeholder={t('form.channelNewName')}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.name && (errors.name || isAlreadyExist)}
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
              {t('modal.rename')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannelModal;
