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
    courses: {
    getAll: { method: 'get', url: `${baseUrl}/courses` },
    create: { method: 'post', url: `${baseUrl}/courses` },
    edit: { method: 'put', url: (id) => `${baseUrl}/courses/${id}` },
    delete: { method: 'delete', url: (id) => `${baseUrl}/courses/${id}` },
    erase: { method: 'delete', url: (id) => `${baseUrl}/courses/${id}/erase` },
    retrieve: { method: 'put', url: (id) => `${baseUrl}/courses/${id}/retrieve` },
  },
      halls: {
    getAll: { method: 'get', url: `${baseUrl}/halls` },
    create: { method: 'post', url: `${baseUrl}/halls` },
    edit: { method: 'put', url: (id) => `${baseUrl}/halls/${id}` },
    delete: { method: 'delete', url: (id) => `${baseUrl}/halls/${id}` },
    erase: { method: 'delete', url: (id) => `${baseUrl}/halls/${id}/erase` },
    retrieve: { method: 'put', url: (id) => `${baseUrl}/halls/${id}/retrieve` },
  },
        staffs: {
    getAll: { method: 'get', url: `${baseUrl}/users` },
    create: { method: 'post', url: `${baseUrl}/users` },
    edit: { method: 'put', url: (id) => `${baseUrl}/users/${id}` },
    delete: { method: 'delete', url: (id) => `${baseUrl}/users/${id}` },
    erase: { method: 'delete', url: (id) => `${baseUrl}/users/${id}/erase` },
    retrieve: { method: 'put', url: (id) => `${baseUrl}/users/${id}/retrieve` },
  },
};

export { apiurls };
