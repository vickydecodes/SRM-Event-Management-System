import { useState, useCallback } from 'react';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { AlertCircleIcon } from 'lucide-react';

const DEFAULT_ERROR = 'Something went wrong. Please try again.';

export function useAsync(actionFn) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const run = useCallback(
    async (...args) => {
      setError(null);
      setLoading(true);

      try {
        const res = await actionFn(...args);
        return res;
      } catch (err) {
        const message = err?.response?.data?.message || err?.message || DEFAULT_ERROR;
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [actionFn]
  );

  const ErrorAlert = error ? (
    <Alert variant="destructive"   className="flex items-center bg-destructive/10 border border-destructive/30 text-center"
>
      <AlertCircleIcon />
      <AlertTitle>{error}</AlertTitle>
    </Alert>
  ) : null;

  return {
    run,
    loading,
    error,
    hasError: !!error,
    ErrorAlert,
    clearError: () => setError(null),
  };
}
