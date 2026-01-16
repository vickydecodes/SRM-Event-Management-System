import { useState, useCallback } from 'react';

/**
 * useLoader()
 *
 * load(...modules, force?)
 * -------------------------
 * - Call this to fetch module data.
 * - Pass module objects OR wrapped module configs.
 * - Optional last argument `true` will force reload.
 *
 * Examples:
 *   load(branches);
 *   load(branches, students);
 *   load(branches, true);
 *
 *   load(
 *     { module: branches, query: { full: true } },
 *     students
 *   );
 *
 *
 * createPreset(...modules)
 * -------------------------
 * - Creates a reusable loader for a fixed set of modules.
 *
 * Example:
 *   const loadDashboard = createPreset(branches, students);
 *
 *   loadDashboard();
 *   loadDashboard(true);
 */

export const useLoader = () => {
  const [loading, setLoading] = useState(false);

  /**
   * Normalize modules into:
   * { module, query }
   */
  const resolveItems = (items) => {
    const arr = Array.isArray(items) ? items : [items];

    return arr.flatMap((item) => {
      if (!item) return [];

      // Wrapped module config
      if (typeof item === 'object' && item.module && typeof item.module.fetch === 'function') {
        return [item];
      }

      // Raw module
      if (typeof item === 'object' && typeof item.fetch === 'function') {
        return [{ module: item, query: null }];
      }

      console.warn('Invalid module passed to load():', item);
      return [];
    });
  };

  /**
   * Detect trailing force flag
   */
  const parseForce = (args) => {
    const last = args[args.length - 1];
    return typeof last === 'boolean' ? last : false;
  };

  /**
   * Core loader
   */
  const load = useCallback(async (...args) => {
    if (!args.length) return [];

    const force = parseForce(args);
    if (force) args = args.slice(0, -1);

    const targets = args.length === 1 && Array.isArray(args[0]) ? args[0] : args;

    const items = resolveItems(targets);
    if (!items.length) return [];

    setLoading(true);

    try {
      const promises = items.map(async ({ module, query }) => {
        const state = module.state;

        // Skip only if NOT forced AND no query
        if (!force && !query) {
          if (Array.isArray(state) && state.length > 0) return 'skipped';
          if (state && typeof state === 'object' && Object.keys(state).length > 0) return 'skipped';
        }

        const fetchFn = module.public || module.fetch;
        return fetchFn(query);
      });

      return await Promise.all(promises);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Preset loader (modules only, optional force)
   */
  const createPreset = useCallback(
    (...presetModules) =>
      (force = true, full = true) => {
        const modules = full
          ? presetModules.map((m) => ({
              module: m,
              query: { full: true },
            }))
          : presetModules;

        return load(modules, force);
      },
    [load]
  );

  return {
    load,
    createPreset,
    loading,
  };
};
