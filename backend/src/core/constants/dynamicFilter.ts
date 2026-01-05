import { Model } from "mongoose";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

export interface FilterConfig<T> {
  searchable?: (keyof T | string)[];
  filterable?: (keyof T | string)[];
  sortable?: (keyof T | string)[];
  defaultSort?: keyof T | string;
}

interface PaginationResult {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

interface DynamicFilterResult<T> {
  data: T[];
  pagination: PaginationResult;
}

type VisibilityMode = "all" | "active-only";

/* -------------------------------------------------------------------------- */
/*                              MAIN FUNCTION                                  */
/* -------------------------------------------------------------------------- */

export const dynamicFilter = async <T>(
  model: Model<any>,
  config: FilterConfig<T>,
  query: Record<string, any>,
  options?: {
    visibility?: VisibilityMode;
  }
): Promise<DynamicFilterResult<T>> => {
  const {
    searchable = [],
    filterable = [],
    sortable = [],
    defaultSort = "createdAt",
  } = config;

  const page = Math.max(parseInt(query.page) || 1, 1);
  const limit = Math.max(parseInt(query.limit) || 10, 1);
  const skip = (page - 1) * limit;

  const mongoQuery: Record<string, any> = {};

  /* ---------------------------- VISIBILITY -------------------------------- */

  if (options?.visibility === "active-only") {
    mongoQuery.deleted = false;
    mongoQuery.active = true;
  }

  /* ------------------------------ SEARCH ---------------------------------- */

  if (query.search && searchable.length) {
    mongoQuery.$or = searchable.map((field) => ({
      [field as string]: {
        $regex: query.search,
        $options: "i",
      },
    }));
  }

  /* ------------------------------ FILTERS --------------------------------- */

  filterable.forEach((field) => {
    const value = query[field as string];
    if (value !== undefined && value !== "") {
      mongoQuery[field as string] = value;
    }
  });

  /* ------------------------------ SORTING --------------------------------- */

  const sortField = sortable.includes(query.sort)
    ? query.sort
    : defaultSort;

  const sortOrder: 1 | -1 = query.order === "asc" ? 1 : -1;

  const [data, total] = await Promise.all([
    model
      .find(mongoQuery)
      .sort({ [sortField]: sortOrder })
      .skip(skip)
      .limit(limit)
      .lean(),
    model.countDocuments(mongoQuery),
  ]);

  return {
    data,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };
};
