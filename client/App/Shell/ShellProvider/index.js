import React, { createContext, useState, useContext } from 'react';

const ShellContext = createContext();

export default props => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [createTemplateOpened, setCreateTemplateOpened] = useState(false);
  const [createListOpened, setCreateListOpened] = useState(false);

  const onCloseCreateTemplate = () => {
    setCreateTemplateOpened(false);
  };

  const onCloseCreateList = () => {
    setSelectedTemplate(null);
    setCreateListOpened(false);
  };

  const openCreateListDialog = ({ id }) => {
    setSelectedTemplate(id);
    setCreateListOpened(true);
  };

  const openCreateTemplateDialog = () => {
    setCreateTemplateOpened(true);
  };

  const { children } = props;

  return (
    <ShellContext.Provider
      value={{
        createTemplateOpened,
        createListOpened,
        openCreateListDialog,
        openCreateTemplateDialog
      }}
      {...props}
    >
      <>{children}</>
    </ShellContext.Provider>
  );
};

export const useShell = () => useContext(ShellContext);
