export interface Campaign {
  id: number;
  title: string;
  description: string;
  isCampaignActive: boolean;
  startDate: Date;
  endDate: Date;
  starLimitation: number;
}

export enum CampaignStatusEnum {
  Active = 'True',
  Deactive = 'False'
}

// export const CampaignStatus = [
//   { status: CampaignStatusEnum.Active, color: 'badge-success' },
//   { status: CampaignStatusEnum.Deactive, color: 'badge-danger' }
// ];
