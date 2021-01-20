import React from 'react';
import { Formik, Form, Field } from 'formik';
import { IconButton, Tooltip } from '@material-ui/core';
import { Check } from '@material-ui/icons';
import { TextField } from 'formik-material-ui';
import { Row } from 'mui-flex-layout';
import * as Yup from 'yup';

export default ({ handleSubmit }) => {
  const validation = Yup.object().shape({
    email: Yup.string()
      .email()
      .required('Required')
  });

  return (
    <Formik
      enableReinitialize
      validationSchema={validation}
      onSubmit={handleSubmit}
      initialValues={{ email: '' }}
    >
      {() => (
        <Form>
          <Row width={'100%'} alignItems={'center'} justifyContent={'center'}>
            <Field
              fullWidth
              type={'text'}
              autoFocus
              label={'Email to share with'}
              name={'email'}
              component={TextField}
            />
            <Tooltip title={'Share'}>
              <IconButton type={'submit'} size={'small'}>
                <Check />
              </IconButton>
            </Tooltip>
          </Row>
        </Form>
      )}
    </Formik>
  );
};
