/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext } from "react";
import { useDepartmentModule } from "@/modules/department/department.module";

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


  const departmentModule = useDepartmentModule(exported);

  Object.assign(exported, {
    departments: departmentModule,
  });


  return (
    <ApiContext.Provider value={{ ...exported }}>
      {children}
    </ApiContext.Provider>
  );
};
