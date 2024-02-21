export enum CampaignObjective {
  WEBSITE_CONVERSIONS = 'WEBSITE_CONVERSIONS',
  WEBSITE_TRAFFIC = 'WEBSITE_TRAFFIC',
  SALES = 'SALES',
  APP_INSTALLATION = 'APP_INSTALLATION',
  LEAD = 'LEAD',
  BRAND = 'BRAND',
  VIDEO_VIEWS = 'VIDEO_VIEWS',
}

export interface Campaign {
  id: number;
  name: string;
  enabled: boolean;
  campaign_objective: CampaignObjective;
  impressions: number;
  clicks: number;
  ctr: number;
  video_views: number;
  vtr: number;
}

export interface ResponseCampaigns {
  content: Campaign[];
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
