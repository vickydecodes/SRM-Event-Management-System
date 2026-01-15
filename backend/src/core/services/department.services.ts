import Department, { IDepartment } from "../../database/models/department.model.js";
import { dynamicFilter, FilterConfig } from "../constants/dynamicfilter.core.ts";


const departmentFilterConfig = {
  searchable: ["name", "code"],
  sortable: ["createdAt"],
  defaultSort: "createdAt",
} satisfies FilterConfig<IDepartment>;

export const create = async (data: any) =>
  new Department(data).save();

export const getAll = async (queries: Record<string, any>, role?: string) =>
  dynamicFilter(Department, departmentFilterConfig, queries, {
    visibility: role === "ADMIN" ? "all" : "active-only",
  });

export const getById = async (id: string) =>
  Department.findById(id);

export const update = async (id: string, data: any) =>
  Department.findByIdAndUpdate(id, data, { new: true });

export const remove = async (id: string) =>
  Department.findByIdAndUpdate(
    id,
    { active: false, deleted: true, deletedAt: new Date() },
    { new: true }
  );

export const erase = async (id: string) =>
  Department.findByIdAndDelete(id);
