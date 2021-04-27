import React from 'react'
import { Column, Row } from 'mui-flex-layout';
import { useFormik } from 'formik';
import { Button, TextField } from '@material-ui/core';
import useRegex from '../../hooks/api/regex.hook'

export default () => {
    const { addNewRegex } = useRegex();

    const formik = useFormik({
        initialValues: {
            name: '',
            regex: ''
        },
        onSubmit: async (values) => {
            await addNewRegex(values)
        }
    })


    return (
        <Row width={'100%'} height={'100%'}>
            <Column height={'100%'} width={'100%'} style={{ alignItems: 'center' }}>
                <h2>{'Add new regex'}</h2>
                <form onSubmit={formik.handleSubmit} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', width: '40%', height: '70%' }}>
                    <TextField name={'name'} label={'name'} onChange={formik.handleChange} value={formik.values.name} />
                    <TextField name={'regex'} label={'Regex'} onChange={formik.handleChange} value={formik.values.regex} />
                    <Button type={'submit'} size={'medium'} variant="contained" color="primary" >
                        {'Add'}
                    </Button>
                </form>
            </Column>
        </Row>
    )
};