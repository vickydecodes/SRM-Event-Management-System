import Enrollment from "../../database/models/enrollment.model.js";
import { dynamicFilter, FilterConfig } from "../constants/dynamicfilter.core.ts";


const enrollmentFilterConfig = {
  filterable: ["bookingId", "studentId"],
  sortable: ["createdAt"],
  defaultSort: "createdAt",
} satisfies FilterConfig<any>;

export const create = async (data: any) =>
  new Enrollment(data).save();

export const getAll = async (queries: Record<string, any>) =>
  dynamicFilter(Enrollment, enrollmentFilterConfig, queries);

export const getById = async (id: string) =>
  Enrollment.findById(id);

export const remove = async (id: string) =>
  Enrollment.findByIdAndDelete(id);
