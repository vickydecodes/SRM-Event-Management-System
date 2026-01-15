import { toast } from 'sonner';

const handleApiError = (
  err,
  fallbackMessage = 'Something went wrong!',
  options = {}
) => {
  const { toast: showToast = true } = options;

  console.group('🚨 API Error');
  console.error(err);
  console.groupEnd();

  const serverMessage =
    err?.response?.data?.message ||
    err?.response?.data?.error ||
    err?.message ||
    fallbackMessage;

  const notify = (message) => {
    if (showToast) toast.error(message);
  };

  if (err?.code === 'ERR_NETWORK') {
    notify('Network error — check your internet connection.');
    return serverMessage;
  }

  if (err?.code === 'ECONNABORTED') {
    notify('Request timed out. Try again.');
    return serverMessage;
  }

  const status = err?.response?.status;

  if (status) {
    const statusMap = {
      400: serverMessage || 'Bad request.',
      401: serverMessage || 'Unauthorized. Please log in again.',
      403: serverMessage || 'You do not have permission for this action.',
      404: serverMessage || 'Requested resource not found.',
      500: serverMessage || 'Server error. Please try again later.',
    };

    notify(statusMap[status] || serverMessage);
    return statusMap[status] || serverMessage;
  }

  notify(serverMessage || fallbackMessage);
  return serverMessage || fallbackMessage;
};

export default handleApiError;
