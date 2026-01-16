export function useSubmit({ run, form, onSuccess }) {
  return async (values) => {
    const res = await run(values);
    form?.reset?.();
    onSuccess?.(res);
    return res;
  };
}
