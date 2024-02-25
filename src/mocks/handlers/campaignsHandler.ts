import { HttpResponse, http } from 'msw';
import { faker } from '@faker-js/faker';
import { Campaign, CampaignObjective, ResponseCampaigns } from '../../types/campaign';
import { defaultPage, defaultSize, totalElements } from '../../constants';

/**
 * @description faker 라이브러리를 이용하여 100개의 데이터를 생성합니다.
 */
export const getCampaigns = http.get('/api/campaigns', ({ request }) => {
  const campaigns: Campaign[] = [];
  const url = new URL(request.url);

  for (let i = 0; i < totalElements; i += 1) {
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

  const pageParams = url.searchParams.get('page');
  const page = pageParams ? parseInt(pageParams, 10) : defaultPage;
  const startIndex = page === 1 ? page - 1 : (page - 1) * defaultSize;

  const responseCampaigns: ResponseCampaigns = {
    content: campaigns.slice(startIndex, startIndex + defaultSize),
    total_elements: totalElements,
    total_pages: Math.ceil(totalElements / defaultSize),
    last: false,
    number: 0,
    size: defaultSize,
    sort: {},
    number_of_elements: defaultSize,
    first: true,
    empty: false,
  };

  return HttpResponse.json(responseCampaigns);
});

export const patchCampaignEnable = http.patch('/api/campaigns/:id', async ({ request, params }) => {
  const { id } = params;

  //NOTE: id를 이용하여 캠페인을 찾아서 enabled를 변경합니다.
  return HttpResponse.json({ result: true, id });
});
