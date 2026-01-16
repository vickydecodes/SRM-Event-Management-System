export default function paginator(module, params) {
  if (!module) return;

  if (params.__replace) {
    module?.fetch({
      page: params.page,
      limit: params.limit,
      search: params.search,
      type: params.type,
    });
    return;
  }

  module?.fetch({
    ...params,
  });
}
