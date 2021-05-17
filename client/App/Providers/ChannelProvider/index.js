import React, { createContext, useState, useEffect, useContext } from 'react';

import useChannelApi from '../../hooks/api/channel.hook';
import { useAlert } from '../AlertProvider';

const ChannelContext = createContext();

export default props => {
  const [channels, setChannels] = useState([]);
  const { open } = useAlert();
  const { getAllChannels } = useChannelApi();

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const data = await getAllChannels();
        
        setChannels(data);
      } catch (error) {
        open({ message: error });
      }
    };

    fetchChannels();
  }, []);

  const { children } = props;

  return (
    <ChannelContext.Provider
      value={{
        channels
      }}
      {...props}
    >
      {children}
    </ChannelContext.Provider>
  );
};

export const useChannel = () => useContext(ChannelContext);
