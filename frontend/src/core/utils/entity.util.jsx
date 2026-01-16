export const createEntityQueryActions = ({ crud, getQuery, setQuery }) => {
  const fetch = (incoming = {}) => {
    const currentQuery = getQuery();

    const nextQuery = {
      ...currentQuery,
      ...incoming,
    };

    setQuery(nextQuery);
    return crud.getAll(nextQuery);
  };

  const reset = () => {
    const defaultQuery = {
      page: 1,
      limit: 10,
      sortBy: null,
      order: null,
      search: undefined,
      branch: undefined,
      batch: undefined,
      board: undefined,
      standard: undefined,
      status: undefined,
      type: undefined,
      'paymentHistory.paymentMethodId': undefined
    };

    setQuery(defaultQuery);
    return crud.getAll(defaultQuery);
  };

  const sortByColumn = (sortBy, order, limit = 10) => {
    const nextQuery = {
      page: 1,
      limit,
      sortBy,
      order,
    };

    setQuery(nextQuery);
    return crud.getAll(nextQuery);
  };

  const presets = {
    latest: (f = {}) => fetch({ sortBy: 'createdAt', order: 'desc', page: 1, ...f }),

    oldest: (f = {}) => fetch({ sortBy: 'createdAt', order: 'asc', page: 1, ...f }),

    ascending: (field = 'name', f = {}) => fetch({ sortBy: field, order: 'asc', page: 1, ...f }),

    descending: (field = 'name', f = {}) => fetch({ sortBy: field, order: 'desc', page: 1, ...f }),

    search: (term, f = {}) => fetch({ search: term, page: 1, ...f }),

    filterByBranch: (branch, f = {}) => fetch({ branch, page: 1, ...f }),

    filterByBatch: (batch, f = {}) => fetch({ batch, page: 1, ...f }),

    filterByBoard: (board, f = {}) => fetch({ board, page: 1, ...f }),

    filterByType: (type, f = {}) => fetch({ type, page: 1, ...f }),

    filterByStandard: (standard, f = {}) => fetch({ standard, page: 1, ...f }),

    filterByStatus: (status, f = {}) => fetch({ status, page: 1, createdAt: 'desc', ...f }),

    filterByPaymentMethodId: (payment, f = {}) =>
      fetch({ 'paymentHistory.paymentMethodId': payment, page: 1, ...f }),
  };

  return {
    fetch,
    reset,
    sortByColumn,
    presets,
  };
};
