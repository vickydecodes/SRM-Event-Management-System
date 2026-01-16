import { Response } from 'express';
import { parseMongoError } from './errorparser.core.ts';
import pluralize from 'pluralize';

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const sendResponse = {
  success: (res: Response, message: string, data: any = null) =>
    res.status(200).json({
      success: true,
      message,
      data,
      timestamp: new Date().toISOString(),
    }),

  created: (res: Response, model: string, data?: any) =>
    res.status(201).json({
      success: true,
      message: `${capitalize(model)} created successfully`,
      data: data || null,
      timestamp: new Date().toISOString(),
    }),

  updated: (res: Response, model: string, data?: any) =>
    res.status(200).json({
      success: true,
      message: `${capitalize(model)} updated successfully`,
      data: data || null,
      timestamp: new Date().toISOString(),
    }),

  fetched: (res: Response, model: string, data?: any) => {
    const plural = Array.isArray(data) && data.length > 1 ? `${pluralize(model)}` : model;
    return res.status(200).json({
      success: true,
      message: `${capitalize(plural)} fetched successfully`,
      data: data || [],
      count: Array.isArray(data) ? data.length : 1,
      timestamp: new Date().toISOString(),
    });
  },
  retrieved: (res: Response, model: string, data?: any) =>
    res.status(200).json({
      success: true,
      message: `${capitalize(model)} retrieved successfully`,
      data: data || null,
      timestamp: new Date().toISOString(),
    }),
  blocked: (res: Response, message: string, data?: any, code: string = 'ENTITY_IN_USE') =>
    res.status(409).json({
      success: false,
      message,
      data: data || null,
      code,
      timestamp: new Date().toISOString(),
    }),

  deleted: (res: Response, model: string, data?: any) =>
    res.status(200).json({
      success: true,
      data: data || null,
      message: `${capitalize(model)} deleted successfully`,
      timestamp: new Date().toISOString(),
    }),

  badRequest: (res: Response, message: string = 'Bad request') => {
    return res.status(400).json({
      success: false,
      message: message,
      data: null,
      timestamp: new Date().toISOString(),
    });
  },

  notFound: (res: Response, model: string) =>
    res.status(404).json({
      success: false,
      message: `${capitalize(model)} not found`,
      timestamp: new Date().toISOString(),
    }),
  paginated: (res: Response, model: string, result: { data: any[]; pagination: any }) => {
    const plural = result.data.length > 1 ? pluralize(model) : model;

    return res.status(200).json({
      success: true,
      message: `${capitalize(plural)} fetched successfully`,
      data: result.data,
      count: result.data.length,
      pagination: result.pagination,
      timestamp: new Date().toISOString(),
    });
  },

  validationError: (res: Response, message: string) =>
    res.status(400).json({
      success: false,
      message,
      timestamp: new Date().toISOString(),
    }),

  unauthorized: (res: Response, message = 'Unauthorized') =>
    res.status(401).json({
      success: false,
      message,
      timestamp: new Date().toISOString(),
    }),

  forbidden: (res: Response, message = 'Forbidden') =>
    res.status(403).json({
      success: false,
      message,
      timestamp: new Date().toISOString(),
    }),

  conflict: (res: Response, message = 'Conflict') =>
    res.status(409).json({
      success: false,
      message,
      timestamp: new Date().toISOString(),
    }),

  error: (res: Response, model: string, err?: any) => {
    const parsed = parseMongoError(err);
    return res.status(500).json({
      success: false,
      message: parsed.message || `Error processing ${model}`,
      code: parsed.code || 'UNKNOWN_ERROR',
      timestamp: new Date().toISOString(),
    });
  },
};

export default sendResponse;
