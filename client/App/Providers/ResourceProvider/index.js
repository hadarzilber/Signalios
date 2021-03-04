import React, { createContext, useState, useEffect, useContext } from 'react';

import useResourceApi from '../../hooks/api/resource.hook';
import { useAlert } from '../AlertProvider';

const ResourceContext = createContext();

export default props => {
  const [resources, setResources] = useState([]);
  const { open } = useAlert();
  const { getAllResources } = useResourceApi();

  useEffect(() => {
    const fetchResources = async () => {
      try {
        console.log('fetch resources');
        const data = await getAllResources();

        console.log(`data ${data}`);
        setResources(data);
      } catch (error) {
        open({ message: error });
      }
    };

    fetchResources();
  }, []);

  const { children } = props;

  return (
    <ResourceContext.Provider
      value={{
        resources
      }}
      {...props}
    >
      {children}
    </ResourceContext.Provider>
  );
};

export const useResource = () => useContext(ResourceContext);
