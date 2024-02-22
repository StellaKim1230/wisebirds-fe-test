export interface User {
  id: number;
  email: string;
  name: string;
  last_login_at: string;
}

export interface ResponseUsers {
  content: User[];
  total_elements: number;
  total_pages: number;
  last: boolean;
  number: number;
  size: number;
  sort: Object;
  number_of_elements: number;
  first: boolean;
  empty: boolean;
}
