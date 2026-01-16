import { mongo, Error } from 'mongoose';
const { MongoServerError } = mongo;
const { ValidationError } = Error;

export const parseMongoError = (err: any) => {
  if (err instanceof MongoServerError && err.code === 11000) {
    const key = Object.keys(err.keyValue)[0];
    return {
      message: `${key.charAt(0).toUpperCase() + key.slice(1)} already exists`,
      code: 'DUPLICATE_KEY',
      field: key,
    };
  }

  if (err instanceof ValidationError) {
    const errors = Object.values(err.errors).map((e: any) => e.message);
    return {
      message: errors.join(', '),
      code: 'VALIDATION_ERROR',
    };
  }

  return {
    message: err.message || 'Unknown error',
    code: 'UNKNOWN_ERROR',
  };
};
