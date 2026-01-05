import { Request, Response } from "express";
import sendResponse from "@core/constants/responseWrapper.js";
import { wrapControllers } from "@core/constants/wrapControllers.js";
import * as service from "@core/services/booking.services.js";
import { AccessRequest } from "@core/middlewares/access.middleware.js";
import { buildQuery } from "@core/constants/queryBuilder.js";
import { createStatusControllers } from "@core/constants/createStatusControllers.js";

const status = createStatusControllers(service, "booking");

const controllers = {
  createBooking: async (req: Request, res: Response) => {
    const booking = await service.create(req.body);
    return sendResponse.created(res, "booking", booking);
  },

  getAllBookings: async (req: AccessRequest, res: Response) => {
    const queries = buildQuery(req);
    const bookings = await service.getAll(queries, req.role);
    return sendResponse.paginated(res, "booking", bookings);
  },

  getBookingById: async (req: Request, res: Response) => {
    const booking = await service.getById(req.params.id);
    if (!booking) return sendResponse.notFound(res, "booking");
    return sendResponse.fetched(res, "booking", booking);
  },

  updateBooking: async (req: Request, res: Response) => {
    const booking = await service.update(req.params.id, req.body);
    if (!booking) return sendResponse.notFound(res, "booking");
    return sendResponse.updated(res, "booking", booking);
  },

  deleteBooking: status.softDelete,
  retrieveBooking: status.retrieve,
  setBookingActiveStatus: status.setActiveStatus,

  eraseBooking: async (req: Request, res: Response) => {
    const booking = await service.erase(req.params.id);
    if (!booking) return sendResponse.notFound(res, "booking");
    return sendResponse.deleted(res, "booking");
  },

  approveBooking: async (req: Request, res: Response) => {
    const booking = await service.approve(req.params.id);
    if (!booking) return sendResponse.notFound(res, "booking");
    return sendResponse.updated(res, "booking", booking);
  },

  rejectBooking: async (req: Request, res: Response) => {
    const booking = await service.reject(req.params.id);
    if (!booking) return sendResponse.notFound(res, "booking");
    return sendResponse.updated(res, "booking", booking);
  },
};

export const {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
  retrieveBooking,
  setBookingActiveStatus,
  eraseBooking,
  approveBooking,
  rejectBooking,
} = wrapControllers(controllers);
