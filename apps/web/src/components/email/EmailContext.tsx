import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import { EmailData } from '@constants';

interface EmailContextProps {
  emails: EmailData[];
  setEmails: (emails: EmailData[]) => void;
}

const EmailContext = createContext<EmailContextProps | undefined>(undefined);

export const EmailProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [emails, setEmails] = useState<EmailData[]>([]);

  const contextValue = useMemo(
    () => ({
      emails,
      setEmails,
    }),
    [emails, setEmails],
  );

  return <EmailContext.Provider value={contextValue}>{children}</EmailContext.Provider>;
};

export const useEmailContext = () => {
  const context = useContext(EmailContext);
  if (!context) {
    throw new Error('useEmailContext must be used within an EmailProvider');
  }
  return context;
};
