import EventHall, { IEventHall } from "../../database/models/event-hall.model.js";
import { dynamicFilter, FilterConfig } from "../constants/dynamicfilter.core.ts";


const hallFilterConfig = {
  searchable: ["name"],
  sortable: ["createdAt"],
  defaultSort: "createdAt",
} satisfies FilterConfig<IEventHall>;

export const create = async (data: any) =>
  new EventHall(data).save();

export const getAll = async (queries: Record<string, any>, role?: string) =>
  dynamicFilter(EventHall, hallFilterConfig, queries, {
    visibility: role === "ADMIN" ? "all" : "active-only",
  });

export const getById = async (id: string) =>
  EventHall.findById(id);

export const update = async (id: string, data: any) =>
  EventHall.findByIdAndUpdate(id, data, { new: true });

export const remove = async (id: string) =>
  EventHall.findByIdAndUpdate(
    id,
    { active: false, deleted: true, deletedAt: new Date() },
    { new: true }
  );

export const erase = async (id: string) =>
  EventHall.findByIdAndDelete(id);
