import React, { createContext, useState, useContext } from 'react';
import Alert from './Snackbar';

const AlertContext = createContext();

export default props => {
  const [message, setMessage] = useState(null);
  const [opened, setOpened] = useState(false);

  const open = ({ message }) => {
    setMessage(message);
    setOpened(true);
  };

  const close = () => {
    setMessage(null);
    setOpened(false);
  };

  const { children } = props;

  return (
    <AlertContext.Provider
      value={{
        close,
        open
      }}
      {...props}
    >
      <Alert message={message} opened={opened} handleClose={close} />
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);
