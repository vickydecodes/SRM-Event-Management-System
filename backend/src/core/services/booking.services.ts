import Booking, { IBooking } from "../../database/models/booking.model.js";
import { dynamicFilter, FilterConfig } from "../constants/dynamicFilter.js";


const bookingFilterConfig = {
  searchable: ["eventName"],
  filterable: ["status", "departmentId", "hallId"],
  sortable: ["fromDate", "createdAt"],
  defaultSort: "createdAt",
} satisfies FilterConfig<IBooking>;

export const create = async (data: any) => {
  const booking = new Booking({ ...data, status: "PENDING" });
  return booking.save();
};

export const getAll = async (queries: Record<string, any>, role?: string) =>
  dynamicFilter(Booking, bookingFilterConfig, queries, {
    visibility: role === "ADMIN" ? "all" : "active-only",
  });

export const getById = async (id: string) =>
  Booking.findById(id).populate("hallId").populate("departmentId");

export const update = async (id: string, data: any) =>
  Booking.findByIdAndUpdate(id, data, { new: true });

export const remove = async (id: string) =>
  Booking.findByIdAndUpdate(
    id,
    { active: false, deleted: true, deletedAt: new Date() },
    { new: true }
  );

export const erase = async (id: string) =>
  Booking.findByIdAndDelete(id);

export const approve = async (id: string) =>
  Booking.findByIdAndUpdate(id, { status: "APPROVED" }, { new: true });

export const reject = async (id: string) =>
  Booking.findByIdAndUpdate(id, { status: "REJECTED" }, { new: true });
