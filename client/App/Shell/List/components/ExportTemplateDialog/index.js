import React from 'react';
import {
  Dialog,
  DialogTitle,
  TextField,
  DialogActions,
  DialogContent,
  Button
} from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';

import useTemplateApi from '../../../../hooks/api/template.hook';
import { useAlert } from '../../../../Providers/AlertProvider';

export default ({ list, opened, handleClose }) => {
  const { createTemplate } = useTemplateApi();
  const { open } = useAlert();

  const save = async ({ name }) => {
    try {
      await createTemplate({
        name,
        tasks: list.tasks.map(t => t.name),
        items: list.items.map(i => i.name)
      });

      handleClose();
      open({ message: 'List exported as a template successfully' });
    } catch (error) {
      open({ message: error });
    }
  };

  const { control, handleSubmit } = useForm();

  return (
    <Dialog open={opened} onClose={handleClose} fullWidth>
      <DialogTitle>{'Export as a Template'}</DialogTitle>
      <form onSubmit={handleSubmit(save)}>
        <DialogContent>
          <Controller
            as={<TextField placeholder={'Name'} autoFocus fullWidth type={'text'} />}
            name={'name'}
            defaultValue={''}
            control={control}
          />
        </DialogContent>
        <DialogActions>
          <Button type={'submit'}>{'Save'}</Button>
          <Button onClick={handleClose}>{'Cancel'}</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
