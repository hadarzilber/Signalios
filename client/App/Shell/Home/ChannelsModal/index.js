import React, { useState, useEffect } from 'react';
import { Column, Row } from 'mui-flex-layout';
import { Modal, Typography } from '@material-ui/core';
import styled from 'styled-components';
import { useChannel } from '../../../Providers/ChannelProvider';
import ChannelCheckBox from './ChannelCheckBox';

const StyledModal = styled(Modal)`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ModalContent = styled(Column)`
  width: 60%;
  height: 60%;
  background-color: white !important;
  border-radius: 10px;
`;

const ModalHeader = styled(Row)`
  width: 100%;
  height: 30%;
  background-color: #9696bb !important;
  display: flex;
  justifyContent: center;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  color: white !important;
  padding: 10px;
`;

const ModalChannels = styled(Column)`
  width: 100%;
  height: 70%;
  background-color: white !important;
  display: flex;
  border-radius: 10px;
  overflow: auto;
`;

export default ({ open, setOpen, setChannelsToDisplay }) => {
    const { channels } = useChannel()
    const [selectedChannels, setSelectedChannels] = useState(null)

    useEffect(() => {
        setSelectedChannels(channels)
    }, [channels])

    useEffect(() => {
        setChannelsToDisplay(selectedChannels)
    }, [selectedChannels])

    const isChannelInSelected = _id => selectedChannels.some(x => x._id === _id)

    const handleChange = channel => {
        if (isChannelInSelected(channel._id)) {
            setSelectedChannels(selectedChannels.filter(x => x._id !== channel._id))
        }
        else {
            setSelectedChannels([...selectedChannels, channel])
        }
    }

    return (
        <StyledModal display={'flex'} onClose={() => setOpen(false)} open={open}>
            <ModalContent>
                <ModalHeader>
                    <Typography variant={'h3'}>{'Channels'}</Typography>
                </ModalHeader>
                <ModalChannels>
                    {channels && channels.map(channel => <ChannelCheckBox handleChange={handleChange} channel={channel} selected={isChannelInSelected(channel._id)} />)}
                </ModalChannels>
            </ModalContent>
        </StyledModal>
    );
};
