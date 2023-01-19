import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import useChatContext from '../contexts/chatContext.js';
import addChannelSchema from '../schemas/channelNameSchema.js';
import { getChannelsNames } from '../slices/channelsSlice.js';

const RenameChannelModal = ({ show, handleClose, channelId }) => {
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
        <Modal.Title>Переименовать</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name" className="mb-3">
            <Form.Control
              type="text"
              value={values.name}
              placeholder="Имя канала"
              onChange={handleChange}
              onBlur={handleBlur}
              required
              isInvalid={touched.name && (errors.name || isAlreadyExist)}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
            {isAlreadyExist && (
              <Form.Control.Feedback type="invalid">
                Имя уже существует
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={handleClose}>
              Отменить
            </Button>
            <Button type="submit" variant="primary">
              Отправить
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannelModal;
