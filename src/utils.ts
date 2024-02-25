import { totalElements, defaultPageSize } from './constants';

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const roundAndConvertToPercentage = (number: number) => (Math.round(number * 1000) / 1000) * 100;

export const paginationObject = (page: number) => ({
  total_elements: totalElements,
  total_pages: Math.ceil(totalElements / defaultPageSize),
  last: Math.ceil(totalElements / defaultPageSize) ? true : false,
  number: 0,
  size: defaultPageSize,
  sort: {},
  number_of_elements: defaultPageSize,
  first: page === 1 ? true : false,
  empty: false,
});
