import React, { useState, useEffect } from 'react';
import { Column } from 'mui-flex-layout';
import { Modal, Typography } from '@material-ui/core';
import styled from 'styled-components';
import { useChannel } from '../../../Providers/ChannelProvider';
import ChannelCheckBox from './ChannelCheckBox';
import channel from '../../../../../server/api/channel/channel';

const ModalContent = styled(Column)`
  width: 60%;
  height: 60%;
  background-color: white !important;
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
            setSelectedChannels([...selectedChannels, channels])
        }
    }

    return (
        <Modal display={'flex'} onClose={() => setOpen(false)} open={open}>
            <ModalContent>
                {channels && channels.map(x => <ChannelCheckBox handleChange={handleChange} channel={x} selected={isChannelInSelected(x._id)} />)}
            </ModalContent>
        </Modal>
    );
};
