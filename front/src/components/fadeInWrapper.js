import React, { useEffect, useState } from 'react';

const FadeInWrapper = ({ children }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className={`fade-in ${visible ? 'visible' : ''}`}>
      {children}
    </div>
  );
};

export default FadeInWrapper;
