import React, { useEffect } from 'react';

export default ({ when, message }) => {
  useEffect(() => {
    const handleBeforeUnload = event => {
      event.preventDefault();
      event.returnValue = message;

      return message;
    };

    if (when) {
      window.addEventListener('beforeunload', handleBeforeUnload);
    }

    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [when, message]);
};
