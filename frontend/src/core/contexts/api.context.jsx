import { createContext, useContext } from 'react';


const ApiContext = createContext();

export const useApi = () => {
  const ctx = useContext(ApiContext);
  if (!ctx) {
    throw new Error('ApiContext must be used inside <ApiProvider>');
  }
  return ctx;
};

export const ApiProvider = ({ children }) => {
  const exported = {};

  return <ApiContext.Provider value={{ ...exported }}>{children}</ApiContext.Provider>;
};
