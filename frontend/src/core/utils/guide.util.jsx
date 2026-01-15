
export function buildGuideFromRoutes(routes = []) {
  const map = new Map();

  routes
    .filter((r) => r.label && r.module)
    .forEach((route) => {
      if (!map.has(route.module)) {
        map.set(route.module, {
          key: route.module, 
          name: route.label,
          description: route.description || '',
          action: route.action || null,
        });
      }
    });

  return Array.from(map.values());
}
