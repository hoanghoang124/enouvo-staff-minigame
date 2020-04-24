export interface TableQuery {
  limit?: number;
  offset?: number;
  orderBy?: any;
  order?: any;
  page?: number;
  firstName?: string;
  lastName?: string;
  fromDate?: string;
  toDate?: string;
  votedStars?: number;
  isCampaignActive?: boolean;
  title?: string;
}
