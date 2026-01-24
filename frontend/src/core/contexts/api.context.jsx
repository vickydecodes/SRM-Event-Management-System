/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext } from "react";
import { useDepartmentModule } from "@/modules/department/department.module";
import { useCourseModule } from "@/modules/course/course.module";
import { useHallModule } from "@/modules/hall/hall.module";
import { useStaffModule } from "@/modules/staff/staff.module";

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
  const courseModule = useCourseModule(exported);
  const hallModule = useHallModule(exported);
  const staffModule = useStaffModule(exported);


  Object.assign(exported, {
    departments: departmentModule,
    courses: courseModule,
    halls: hallModule,
    staffs: staffModule
  });


  return (
    <ApiContext.Provider value={{ ...exported }}>
      {children}
    </ApiContext.Provider>
  );
};
