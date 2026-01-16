const baseUrl = import.meta.env.VITE_BASE_URL;

const apiurls = {
  departments: {
    getAll: { method: 'get', url: `${baseUrl}/departments` },
    create: { method: 'post', url: `${baseUrl}/departments` },
    edit: { method: 'put', url: (id) => `${baseUrl}/departments/${id}` },
    delete: { method: 'delete', url: (id) => `${baseUrl}/departments/${id}` },
    erase: { method: 'delete', url: (id) => `${baseUrl}/departments/${id}/erase` },
    retrieve: { method: 'put', url: (id) => `${baseUrl}/departments/${id}/retrieve` },
  },
};

export { apiurls };
