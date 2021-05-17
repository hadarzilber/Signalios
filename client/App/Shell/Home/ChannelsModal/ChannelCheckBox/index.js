import React from 'react';
import {  Row } from 'mui-flex-layout';
import { Checkbox, Typography } from '@material-ui/core';

export default ({ channel, selected,handleChange }) => {

    const onChange = () => {
        handleChange(channel)
    }

    return (
        <Row>
            <Checkbox checked={selected} color="primary" onChange={onChange} />
            <Typography>{channel.name}</Typography>
        </Row>
    );
};
