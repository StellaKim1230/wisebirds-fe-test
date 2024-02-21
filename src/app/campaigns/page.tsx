import { use } from 'react';
import { ResponseCampaigns } from '../../types/campaign';

async function getCampaigns() {
  const response = await fetch(`${process.env.API_URL}/api/campaigns`);
  const campagins = await response.json();
  return campagins;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const campaigns: ResponseCampaigns = use(getCampaigns());
  console.log('campaigns', campaigns);
  return <></>;
}
