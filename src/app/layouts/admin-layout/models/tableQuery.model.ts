export interface TableQuery {
  limit?: number;
  offset?: number;
  orderBy?: string;
  filter?: any;
  q?: any;
  page?: number;
  perPage?: number;
}
