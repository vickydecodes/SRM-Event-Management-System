import { toast } from 'sonner';
import handleApiError from '@/core/errors/error.handler';
import { apiRequest } from '../api/api.request';
import { camelToTitle } from '../utils/helper.utils';

export const createCrud = ({ entity, urls, store, getRole }) => {
  const crud = {};

  const loading = {
    global: false,
    getAll: false,
    create: false,
    edit: false,
    delete: false,
  };

  const toastMessages = {
    create: (entity) => `${camelToTitle(entity)} created successfully`,
    edit: (entity) => `${camelToTitle(entity)} updated successfully`,
    delete: (entity) => `${camelToTitle(entity)} deleted successfully`,
    erase: () => `${camelToTitle(entity)} deleted permanently from database successfully`,
    retrieve: () => `${camelToTitle(entity)} retrieved successfully`,
    erasePaymentHistory: () => `Payment history deleted Sucessfully`,
    toggleStatus: () => () => `Payment History approved Sucessfully`,
    bulkUpdate: () => `Marks have been updated for the students`,
    setActiveStatus: (entity, res) =>
      res?.active
        ? `${camelToTitle(entity)} is now active`
        : `${camelToTitle(entity)} has been deactivated`,
  };

  const defaultMessages = {
    create: 'created',
    edit: 'updated',
    delete: 'deleted',
  };

  const startLoading = (key) => {
    if (loading[key] !== undefined) {
      loading[key] = true;
      loading.global = true;
    }
  };

  const stopLoading = (key) => {
    if (loading[key] !== undefined) {
      loading[key] = false;
      loading.global = loading.create || loading.edit || loading.delete || loading.getAll;
    }
  };

  const DOWNLOAD_KEYS = ['download', 'exportCsv', 'exportXlsx', 'exportPdf'];

  Object.entries(urls).forEach(([key, config]) => {
    const { method, url } = config;

    crud[key] = async (...args) => {
      const lastArg = args[args.length - 1];
      const isOptions = lastArg && typeof lastArg === 'object' && lastArg.__options;

      const callOptions = isOptions ? lastArg.__options : {};
      if (isOptions) args.pop();

      startLoading(key);

      try {
        const finalUrl = typeof url === 'function' ? url(...args) : url;
        const isBody = ['post', 'put', 'patch'].includes(method.toLowerCase());

        if (DOWNLOAD_KEYS.includes(key)) {
          const fullUrl = finalUrl;
          console.log('⬇️ [Download] Requesting:', fullUrl);

          const response = await apiRequest('download', finalUrl, {
            params: args[0],
          });
          toast.success(`Downloaded: ${response}`);
          return;
        }

        let options = {};

        if (isBody) {
          const body = args[args.length - 1];
          if (typeof body === 'object' && body !== null) {
            options.data = body;
          }
        } else {
          const maybeParams = args[args.length - 1];
          if (typeof maybeParams === 'object' && maybeParams !== null) {
            options.params = maybeParams;
          }
        }

        const res = await apiRequest(method, finalUrl, options);

        if (key === 'getAll') {
          store.set(res.data || []);

          if (res.pagination) {
            store.setPagination(res.pagination);
          }
        }

        if (key === 'create') {
          store.add(res.data);
        }

        if (
          key === 'edit' ||
          key === 'setActiveStatus' ||
          key === 'toggleStatus' ||
          key === 'erasePaymentHistory'
        ) {
          store.update(args[0], res.data);
        }

        const role = getRole?.();

        if (key === 'delete') {
          if (role !== 'super_admin') {
            store.remove(args[0]);
          } else {
            store.update(args[0], { deleted: true, active: false });
          }
        }

        if (key === 'retrieve') {
          store.update(args[0], { deleted: false, active: true });
        }

        if (key === 'erase') {
          store.remove(args[0]);
        }

        const shouldToast = callOptions.toast !== false;

        if (shouldToast) {
          if (toastMessages[key]) {
            toast.success(toastMessages[key](entity, res.data));
          } else if (defaultMessages[key]) {
            toast.success(`${entity} ${defaultMessages[key]} successfully`);
          }
        }

        return res.data;
      } catch (err) {
        console.log(callOptions, lastArg, args)
        const message = handleApiError(err, `Failed to ${key} ${entity}`, {
          toast: callOptions.error !== false,
        });

        throw new Error(message); // 🔥 REQUIRED
      } finally {
        stopLoading(key);
      }
    };
  });

  Object.defineProperty(crud, 'loading', {
    get() {
      return loading;
    },
  });

  return crud;
};
