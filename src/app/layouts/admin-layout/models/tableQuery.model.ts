export interface TableQuery {
  limit?: number;
  offset?: number;
  orderBy?: string;
  order?: number;
  filter?: any;
  q?: any;
  page?: number;
  perPage?: number;
}
