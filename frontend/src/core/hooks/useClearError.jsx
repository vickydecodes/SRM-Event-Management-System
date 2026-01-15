import { useEffect } from 'react';

export function useClearError(form, clearError) {
  useEffect(() => {
    if (!form || !clearError) return;

    const subscription = form.watch(() => {
      clearError();
    });

    return () => subscription.unsubscribe();
  }, [form, clearError]);
}
