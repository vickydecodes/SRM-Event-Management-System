export const parseMongoError = (error: any) => {
  if (error?.code === 11000) {
    const field = Object.keys(error.keyValue || {})[0];
    return {
      message: `${field} already exists`,
      code: "DUPLICATE_KEY",
    };
  }

  return {
    message: error?.message || "Internal Server Error",
    code: "UNKNOWN_ERROR",
  };
};
