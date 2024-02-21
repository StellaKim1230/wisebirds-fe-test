import { faker } from '@faker-js/faker';
import { HttpResponse, http } from 'msw';
import { Campaign, CampaignObjective, ResponseCampaigns } from '../../types/campaign';

/**
 * @description 페이지네이션을 하기 위해 65개의 더미 데이터를 생성합니다.
 */

export const getCampaigns = http.get('/api/campaigns', ({ request }) => {
  const campaigns: Campaign[] = [];
  const url = new URL(request.url);

  for (let i = 0; i < 65; i += 1) {
    const campaign: Campaign = {
      id: i + 1,
      name: `캠페인${i + 1}`,
      enabled: faker.datatype.boolean(),
      campaign_objective: faker.helpers.enumValue(CampaignObjective),
      impressions: parseInt(faker.number.int().toString().slice(0, 6), 10),
      clicks: parseInt(faker.number.int().toString().slice(0, 4), 10),
      ctr: parseFloat(faker.number.float().toFixed(4)),
      video_views: parseInt(faker.number.int().toString().slice(0, 3), 10),
      vtr: parseFloat(faker.number.float().toFixed(4)),
    };

    campaigns.push(campaign);
  }

  const responseCampaings: ResponseCampaigns = {
    content: campaigns.slice(0, 25),
    total_elements: 65,
    total_pages: 3,
    last: false,
    number: 0,
    size: 25,
    sort: {},
    number_of_elements: 25,
    first: true,
    empty: false,
  };

  return HttpResponse.json(responseCampaings);
});
