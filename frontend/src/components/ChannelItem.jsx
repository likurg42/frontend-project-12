import {
  Nav, Dropdown, Button, ButtonGroup,
} from 'react-bootstrap';

const ChannelItem = ({
  channel,
  currentChannel,
  handleChannel,
  handleModal,
  t,
}) => {
  const { id, name, removable } = channel;
  const { id: currentChannelId } = currentChannel;

  if (removable) {
    return (
      <Nav.Item as="li" className="w-100">
        <Dropdown as={ButtonGroup} className="w-100 rounded-0">
          <Button
            variant={currentChannelId === id ? 'secondary' : 'light'}
            id="dropdown-split-basic"
            className="w-100 rounded-0 text-start text-truncate"
            onClick={handleChannel(id)}
          >
            {'# '}
            {name}
          </Button>
          <Dropdown.Toggle
            split
            variant={currentChannelId === id ? 'secondary' : 'light'}
            id="dropdown-split-basic"
          >
            <span className="visually-hidden">{t('channels.channelManagment')}</span>
          </Dropdown.Toggle>
          <Dropdown.Menu flip="true" align="start" style={{ zIndex: 9999 }}>
            <Dropdown.Item onClick={handleModal(true, 'remove', id)}>
              {t('channels.remove')}
            </Dropdown.Item>
            <Dropdown.Item onClick={handleModal(true, 'rename', id)}>
              {t('channels.rename')}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Nav.Item>
    );
  }

  return (
    <Nav.Item as="li" className="w-100">
      <Button
        variant={currentChannelId === id ? 'secondary' : 'light'}
        className="w-100 rounded-0 text-start text-truncate"
        onClick={handleChannel(id)}
      >
        {'# '}
        {name}
      </Button>
    </Nav.Item>
  );
};

export default ChannelItem;
