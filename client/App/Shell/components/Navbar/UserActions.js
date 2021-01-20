import React, { useState, useEffect, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Tooltip,
  Menu,
  MenuItem,
  IconButton,
  ListItemAvatar,
  ListItemText,
  Divider,
  Badge,
  Typography
} from '@material-ui/core';
import { NotificationsOutlined, PersonOutlined } from '@material-ui/icons';
import { Column, Row } from 'mui-flex-layout';
import Moment from 'react-moment';
import styled from 'styled-components';

import { useShell } from '../../ShellProvider';
import useAuthApi from '../../../hooks/api/auth.hook';
import { useAlert } from '../../../Providers/AlertProvider';
import { useAuth } from '../../../Providers/AuthProvider';
import useNotificationApi from '../../../hooks/api/notification.hook';
import UserAvatar from '../../../components/UserAvatar';

const DateCaption = styled(Typography)`
  margin-left: 5px;
`;

const ActionButton = styled(IconButton)`
  color: white;
`;
const MarginedAvatarButton = styled(ActionButton)`
  margin-right: 15px;
`;

const NotificationHeader = styled(Typography)`
  font-weight: 700;
  margin: 10px;
`;

export default () => {
  const [notifications, setNotifications] = useState([]);
  const [menuOpened, setMenuOpened] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);
  const { logout } = useAuthApi();
  const { getAllNotifications, viewNotifications } = useNotificationApi();
  const { open } = useAlert();

  const handleLogout = () => {
    logout();
  };

  const handleOpenNotificationsMenu = async ({ currentTarget }) => {
    setMenuAnchor(currentTarget);
    setMenuOpened(true);

    try {
      const updated = await viewNotifications();

      setNotifications(updated);
    } catch (error) {
      open({ message: error });
    }
  };

  const handleOpenUserMenu = async ({ currentTarget }) => {
    setUserMenuOpened(true);
    setUserMenuAnchor(currentTarget);
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await getAllNotifications();

        setNotifications(data);
      } catch (error) {
        open({ message: error });
      }
    };

    fetchNotifications();
  }, []);

  const handleCloseNotificationsMenu = () => {
    setMenuOpened(false);
    setMenuAnchor(null);
  };

  const handleCloseUserMenu = () => {
    setUserMenuOpened(false);
    setUserMenuAnchor(null);
  };

  const newNotifications = () => notifications.some(x => !x.viewed);

  return (
    <>
      <Row width={'100%'} justifyContent={'flex-end'}>
        <Tooltip title={'Notifications'}>
          <ActionButton onClick={handleOpenNotificationsMenu} size={'medium'}>
            <Badge variant={'dot'} invisible={!newNotifications()} color={'primary'}>
              <NotificationsOutlined />
            </Badge>
          </ActionButton>
        </Tooltip>
        <Tooltip title={'Account'}>
          <MarginedAvatarButton color={'inherit'} size={'medium'} onClick={handleOpenUserMenu}>
            <PersonOutlined />
          </MarginedAvatarButton>
        </Tooltip>
      </Row>
      <Menu
        anchorEl={userMenuAnchor}
        keepMounted
        open={userMenuOpened}
        onClose={handleCloseUserMenu}
      >
        <MenuItem>
          <ListItemText primary={<Typography variant={'body1'}>{'Edit Profile'}</Typography>} />
        </MenuItem>

        <MenuItem onClick={handleLogout}>
          <ListItemText primary={<Typography variant={'body1'}>{'Logout'}</Typography>} />
        </MenuItem>
      </Menu>
      <Menu
        anchorEl={menuAnchor}
        keepMounted
        open={menuOpened}
        onClose={handleCloseNotificationsMenu}
      >
        <Column width={'100%'} height={'100%'}>
          <NotificationHeader variant={'caption'}>{'Notifications'}</NotificationHeader>
          <Divider />
          {notifications.length ? (
            notifications.map(({ _id: id, content, involvedUser, date }, index) => (
              <Fragment key={id}>
                <MenuItem>
                  <ListItemAvatar>
                    <UserAvatar user={involvedUser} size={'md'} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Column alignItems={'flex-start'}>
                        <Typography variant={'body1'}>{`${content}`}</Typography>
                        <DateCaption color={'textSecondary'} variant={'caption'}>
                          <Moment fromNow ago>
                            {date}
                          </Moment>
                        </DateCaption>
                      </Column>
                    }
                  />
                </MenuItem>
                {index < notifications.length - 1 && <Divider variant={'inset'} />}
              </Fragment>
            ))
          ) : (
            <MenuItem>
              <ListItemText>
                <Typography>{'No new Activity to show'}</Typography>
              </ListItemText>
            </MenuItem>
          )}
        </Column>
      </Menu>
    </>
  );
};
