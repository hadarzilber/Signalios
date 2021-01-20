import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  DialogActions,
  DialogContent,
  IconButton,
  Button
} from '@material-ui/core';
import { Clear } from '@material-ui/icons';
import _ from 'lodash';

import UserAvatar from '../../../../components/UserAvatar';
import useUserApi from '../../../../hooks/api/user.hook';
import { useAlert } from '../../../../Providers/AlertProvider';
import CollaboratorsForm from './CollaboratorsForm';

export default ({ handleSubmit, collaborators, owner, opened, handleClose }) => {
  const [editedCollaborators, setEditedCollaborators] = useState(collaborators);
  const { getUserByEmail } = useUserApi();
  const { open } = useAlert();

  const removeCollaborator = ({ index }) => {
    editedCollaborators.splice(index, 1);

    setEditedCollaborators([...editedCollaborators]);
  };

  const save = async () => {
    await handleSubmit({ collaborators: editedCollaborators });
    handleClose();
  };

  const handleAdd = async ({ email }, { setSubmitting, resetForm }) => {
    try {
      if (editedCollaborators.find(c => c.email === email)) {
        return open({ message: 'Email already exists!' });
      }

      const user = await getUserByEmail({ email });

      setEditedCollaborators([...editedCollaborators, user]);
    } catch (error) {
      open({ message: error });
    } finally {
      resetForm();
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={opened} onClose={handleClose} fullWidth>
      <DialogTitle>{'Collaborators'}</DialogTitle>
      <DialogContent>
        <List>
          <ListItem>
            <ListItemAvatar>
              <UserAvatar size={'md'} user={owner} />
            </ListItemAvatar>
            <ListItemText
              primary={`${owner.name.first} ${owner.name.last}`}
              secondary={`${owner.email} (Owner)`}
            />
          </ListItem>
          {editedCollaborators.map(
            (c, index) =>
              owner._id !== c._id && (
                <ListItem key={c.email}>
                  <ListItemAvatar>
                    <UserAvatar size={'md'} user={c} />
                  </ListItemAvatar>
                  <ListItemText primary={`${c.name.first} ${c.name.last}`} secondary={c.email} />
                  <ListItemSecondaryAction>
                    <IconButton onClick={() => removeCollaborator({ index })} edge={'end'}>
                      <Clear />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              )
          )}
        </List>
        <CollaboratorsForm handleSubmit={handleAdd} />
      </DialogContent>
      <DialogActions>
        <Button onClick={save}>{'Save'}</Button>
        <Button onClick={handleClose}>{'Cancel'}</Button>
      </DialogActions>
    </Dialog>
  );
};
