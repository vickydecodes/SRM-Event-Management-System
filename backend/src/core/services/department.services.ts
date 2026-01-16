import Department, { IDepartment } from '../../database/models/department.model.js';
import { dynamicFilter, FilterConfig } from '../constants/dynamicfilter.core.ts';

const departmentFilterConfig = {
  searchable: ['name', 'code'],
  sortable: ['createdAt'],
  defaultSort: 'createdAt',
} satisfies FilterConfig<IDepartment>;

export const create = async (data: any) => {
  const department = await new Department(data).save();
  return department;
};

export const getAll = async (queries: Record<string, any>, role?: string) => {
  return dynamicFilter(Department, departmentFilterConfig, queries, {
    visibility: role === 'admin' ? 'all' : 'active-only'
  });
};

export const getById = async (id: string) => {
  return await Department.findById(id);
};

export const update = async (id: string, data: any) => {
  const department = await Department.findByIdAndUpdate(id, data, { new: true });
  return department;
};

export const remove = async (id: string) => {
  const department = await Department.findByIdAndUpdate(
    id,
    { active: false, deleted: true, deletedAt: new Date() },
    { new: true }
  );
  return department;
};

export const retrieve = async (id: string) => {
  const department = await Department.findByIdAndUpdate(
    id,
    { active: true, deleted: false, deletedAt: null },
    { new: true }
  );
  return department;
};

export const erase = async (id: string) => {
  return await Department.findByIdAndDelete(id);
};
