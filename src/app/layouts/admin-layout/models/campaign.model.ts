export interface Campaign {
  id: number;
  title: string;
  description: string;
  isCampaignActive: boolean;
  startDate: Date;
  endDate: Date;
  starLimitation: number;
}
