import React, { useEffect, useState } from 'react';
import { Row, Column } from 'mui-flex-layout';
import { Prompt } from 'react-router';

import { useForm, FormContext } from 'react-hook-form';
import { Typography } from '@material-ui/core';
import styled from 'styled-components';

import useBeforeUnload from '../../../../hooks/useBeforeUnload';
import FieldArray from './components/FieldArray';

const Form = styled.form`
  width: 100%;
  height: 100%;
`;

export default ({ list: { tasks, items }, handleSubmit: submit }) => {
  const [changed, setChanged] = useState(true);

  useBeforeUnload({
    when: changed,
    message: 'Changes will not be saved if you leave now'
  });

  // eslint-disable-next-line prefer-const
  let formMethods;

  useEffect(() => {
    return async () => {
      await formMethods.handleSubmit(submit)();
      setChanged(false);
    };
  }, []);

  const methods = useForm({
    defaultValues: { tasks, items }
  });

  // eslint-disable-next-line prefer-const
  formMethods = methods;

  return (
    <Column height={'100%'} width={'100%'}>
      <FormContext {...methods}>
        <Form onSubmit={methods.handleSubmit(submit)}>
          <Column height={'100%'} width={'100%'}>
            <Row height={'100%'} width={'100%'}>
              <Column width={'100%'} height={'100%'}>
                <Typography variant={'body2'} color={'textSecondary'}>
                  {'Items'}
                </Typography>
                <FieldArray name={'items'} />
              </Column>
              <Column width={'100%'} height={'100%'}>
                <Typography variant={'body2'} color={'textSecondary'}>
                  {'Tasks'}
                </Typography>
                <FieldArray name={'tasks'} />
              </Column>
            </Row>
          </Column>
        </Form>
      </FormContext>
      <Prompt when={changed} message={'Wtf?'} />
    </Column>
  );
};
