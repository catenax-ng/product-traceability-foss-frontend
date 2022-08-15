import _deepClone from 'lodash-es/cloneDeep';
import { RestRequest } from 'msw';

type SortDirection = 'asc' | 'desc' | '';

export interface PaginationFilters {
  page: number;
  size: number;
  sortItem: string;
  sortDirection: SortDirection;
}

export const extractPagination = (req: RestRequest): PaginationFilters => {
  const page = parseInt(req.url.searchParams.get('page') ?? '0', 10);
  const size = parseInt(req.url.searchParams.get('size') ?? '5', 10);
  const [sortItem, sortDirection] = (req.url.searchParams.get('sort') ?? ',').split(',');

  return {
    page,
    size,
    sortItem,
    sortDirection,
  } as PaginationFilters;
};

export const applyPagination = (items: unknown[], filters: PaginationFilters) => {
  const currentItems = _deepClone(items);
  const { size, page, sortItem, sortDirection } = filters;
  const offset = filters.page * filters.size;

  const sortAsc = (a, b) => (a === b ? 0 : a < b ? -1 : 1);
  const sortDesc = (a, b) => (a === b ? 0 : a > b ? -1 : 1);

  if (!!sortDirection) {
    const sortFunction = sortDirection === 'asc' ? sortAsc : sortDesc;
    currentItems.sort((partA, partB) => sortFunction(partA[sortItem], partB[sortItem]));
  }

  return {
    content: currentItems.slice(offset, offset + size),
    page: page,
    pageCount: Math.ceil(currentItems.length / size),
    pageSize: size,
    totalItems: currentItems.length,
  };
};
