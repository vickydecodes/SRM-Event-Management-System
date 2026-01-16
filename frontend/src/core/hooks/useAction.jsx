import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
// import { toast } from "sonner";

export const useAction = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const hasReceiver = useRef(false);

  const navigateWith = (path) => ({
    trigger: (type, payload = null) =>
      navigate(path, { state: { type, payload } }),

    create: (payload = null) => navigate(path, { state: { type: "create", payload } }),
    edit:   (payload = null) => navigate(path, { state: { type: "edit", payload } }),
    delete: (payload = null) => navigate(path, { state: { type: "delete", payload } }),
    view:   (payload = null) => navigate(path, { state: { type: "view", payload } }),
  });

  const usePageAction = (handlers = {}) => {
    hasReceiver.current = true;

    const action = location.state?.type;
    const payload = location.state?.payload;

    useEffect(() => {
      if (!action) return;

      if (Object.keys(handlers).length === 0) {
        // toast.error("No action handlers defined for this page.");
        return navigate(location.pathname, { replace: true });
      }

      const fn = handlers[action];

      if (!fn) {
        // toast.error(`Action '${action}' is not supported on this page.`);
        return navigate(location.pathname, { replace: true });
      }

      fn(payload);
      navigate(location.pathname, { replace: true });
    }, [action]);
  };

  useEffect(() => {
    const action = location.state?.type;
    if (action && !hasReceiver.current) {
      // toast.error(
      //   `This page did not call usePageAction() — unable to run action '${action}'.`
      // );
      navigate(location.pathname, { replace: true });
    }
  }, []);

  return { navigateWith, usePageAction };
};
