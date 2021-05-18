import React from 'react';
import {  Row } from 'mui-flex-layout';
import { Checkbox, Typography } from '@material-ui/core';
import styled from 'styled-components'

const StyledBox = styled(Row)`
    display: flex;
    align-items: center;
`;

export default ({ channel, selected,handleChange }) => {

    const onChange = () => {
        handleChange(channel)
    }

    return (
        <StyledBox>
            <Checkbox checked={selected} color="primary" onChange={onChange} />
            <Typography>{channel.name}</Typography>
        </StyledBox>
    );
};
