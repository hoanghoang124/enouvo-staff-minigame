export interface TableQuery {
  limit?: number;
  offset?: number;
  orderBy?: string;
  filter?: any;
  page?: number;
  perPage?: number;
}
