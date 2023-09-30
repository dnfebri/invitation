interface IPaginationOptions {
  page: number;
  limit: number;
}

export const CustomPagination = <T>(
  data: T[],
  total: number,
  options: IPaginationOptions
) => {
  if (options.limit > 50) options.limit = 50;

  const total_pages = Math.ceil(total / options.limit);
  const has_previous_page = options.page > 1;
  const has_next_page = options.page < total_pages;

  const metadata = {
    total: total,
    per_page: options.limit,
    total_pages,
    current_page: options.page,
    has_previous_page,
    has_next_page,
  };

  return {
    metadata,
    data,
  };
};
