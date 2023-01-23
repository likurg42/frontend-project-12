import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Nav, Button, Dropdown, ButtonGroup,
} from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { changeCurrentChannel } from '../slices/channelsSlice.js';
import AddChannelModal from './AddChannelModal.jsx';
import RemoveChannelModal from './RemoveChannelModal.jsx';
import RenameChannelModal from './RenameChannelModal.jsx';

const Channels = ({ channels, currentChannel }) => {
  const { t } = useTranslation();

  const notify = (text) => () => toast.success(text, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });

  const [modals, setModals] = useState({
    remove: false,
    add: false,
    rename: false,
    channelId: null,
  });

  const handleOpenModal = (name, channelId) => () => setModals(({
    ...modals,
    [name]: true,
    channelId,
  }));

  const handleCloseModal = (name) => () => setModals(({
    ...modals,
    [name]: false,
    channelId: null,
  }));

  const dispatch = useDispatch();

  const handleChangeChannel = (id) => (e) => {
    e.preventDefault();
    dispatch(changeCurrentChannel(id));
  };

  return (
    <div className="bg-light overflow-auto">
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2 ">
        <span>{t('channels.channels')}</span>
        <Button active="false" variant="link" className="p-0 text-primary btn-group-vertical" onClick={handleOpenModal('add')}>
          <PlusSquare size={20} />
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <Nav className="flex-column px-2 " variant="pills" as="ul">
        {channels.map(({ id, name, removable }) => (
          <Nav.Item key={id} as="li">
            {removable ? (
              <Dropdown as={ButtonGroup} className="w-100 rounded-0">
                <Button
                  variant={currentChannel.id === id ? 'secondary' : 'light'}
                  id="dropdown-split-basic"
                  className="w-100 rounded-0 text-start"
                  onClick={handleChangeChannel(id)}
                >
                  {'# '}
                  {name}
                </Button>
                <Dropdown.Toggle
                  split
                  variant={currentChannel.id === id ? 'secondary' : 'light'}
                  id="dropdown-split-basic"
                >
                  <span className="visually-hidden">{t('channels.channelManagment')}</span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={handleOpenModal('remove', id)}>
                    {t('channels.remove')}
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleOpenModal('rename', id)}>
                    {t('channels.rename')}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

            ) : (
              <Button
                variant={currentChannel.id === id ? 'secondary' : 'light'}
                className="w-100 rounded-0 text-start"
                onClick={handleChangeChannel(id)}
              >
                {'# '}
                {name}
              </Button>
            )}

          </Nav.Item>
        ))}
      </Nav>
      <AddChannelModal
        show={modals.add}
        handleClose={handleCloseModal('add')}
        notify={notify(t('toastMessage.channelAdded'))}
      />
      <RemoveChannelModal
        show={modals.remove}
        handleClose={handleCloseModal('remove')}
        channelId={modals.channelId}
        notify={notify(t('toastMessage.channelRemoved'))}
      />
      <RenameChannelModal
        show={modals.rename}
        handleClose={handleCloseModal('rename')}
        channelId={modals.channelId}
        notify={notify(t('toastMessage.channelRenamed'))}
      />
    </div>
  );
};

export default Channels;
