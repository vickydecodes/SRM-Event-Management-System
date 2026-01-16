import { capitalize } from './helper.utils';

const DEFAULT_OPTIONS = {
  pick: 'name',
  booleanMap: { true: 'Active', false: 'Inactive' },
  lower: false,
  fallback: 'Unknown data',
  joinWith: ', ',
};

export const safetext = (value, options = {}) => {
  const { pick, booleanMap, lower, fallback, joinWith } = { ...DEFAULT_OPTIONS, ...options };

  if (value === null || value === undefined) return fallback;
  if (value === '') return '-';

  if (typeof value === 'boolean') {
    return booleanMap?.[value] ?? fallback;
  }

  if (Array.isArray(value)) {
    if (value.length === 0) return fallback;

    if (pick) {
      const picked = value
        .map((v) =>
          v && typeof v === 'object' && v[pick] != null ? capitalize(String(v[pick])) : null
        )
        .filter(Boolean);

      return picked.length ? picked.join(joinWith) : fallback;
    }

    return value.map((v) => (lower ? String(v) : capitalize(String(v)))).join(joinWith);
  }

  if (typeof value === 'object') {
    if (pick && value[pick] != null) {
      return capitalize(String(value[pick]));
    }
    return fallback;
  }

  return lower ? String(value) : capitalize(String(value));
};
