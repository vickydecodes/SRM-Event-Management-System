import { capitalize } from './helper.utils';
export const safetext = (value, fallbackOrOptions, maybeOptions) => {
  let fallback = 'Unknown data';
  let options = {
    pick: 'name',
    booleanMap: { true: 'Active', false: 'Inactive' },
  };

  if (
    fallbackOrOptions &&
    typeof fallbackOrOptions === 'object' &&
    !Array.isArray(fallbackOrOptions)
  ) {
    options = { ...options, ...fallbackOrOptions };
  } else if (typeof fallbackOrOptions === 'string') {
    fallback = fallbackOrOptions;
  }

  if (maybeOptions && typeof maybeOptions === 'object') {
    options = { ...options, ...maybeOptions };
  }

  if (value === null || value === undefined) return fallback;

  if(value === ''){
    return fallback = '-'
  }

  if (typeof value === 'boolean') {
    return options.booleanMap?.[value] ?? fallback;
  }

  const pick = options.pick;
  const joinWith = options.joinWith || ', ';

  if (Array.isArray(value)) {
    if (value.length === 0) return fallback;

    if (pick) {
      const picked = value
        .map((v) =>
          v && typeof v === 'object' && v[pick] != null ? capitalize(String(v[pick])) : null
        )
        .filter(Boolean);

      return picked.length > 0 ? picked.join(joinWith) : fallback;
    }

    return value.map((v) => capitalize(String(v))).join(joinWith);
  }

  if (typeof value === 'object') {
    if (pick && value[pick] != null) {
      return capitalize(String(value[pick]));
    }
    return fallback;
  }

  return capitalize(String(value));
};
