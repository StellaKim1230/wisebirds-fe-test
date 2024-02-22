import { faker } from '@faker-js/faker';
import { HttpResponse, http } from 'msw';
import { Campaign, CampaignObjective, ResponseCampaigns } from '../../types/campaign';
import { defaultPage, defaultSize } from '../../constants';

/**
 * @description 페이지네이션을 하기 위해 65개의 더미 데이터를 생성합니다.
 */

const TotalElements = 65;

export const getCampains = http.get('/api/campaigns', ({ request }) => {
  const campaigns: Campaign[] = [];
  const url = new URL(request.url);

  for (let i = 0; i < TotalElements; i += 1) {
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

  const responseCampaings: ResponseCampaigns = {
    content: campaigns.slice(startIndex, startIndex + defaultSize),
    total_elements: TotalElements,
    total_pages: Math.ceil(TotalElements / defaultSize),
    last: false,
    number: 0,
    size: defaultSize,
    sort: {},
    number_of_elements: defaultSize,
    first: true,
    empty: false,
  };

  return HttpResponse.json(responseCampaings);
});

export const patchCampaignEnable = http.patch('/api/campaigns/:id', async ({ request, params }) => {
  const { id } = params;

  //NOTE: id를 이용하여 캠페인을 찾아서 enabled를 변경합니다.
  const enabled = await request.json();

  return HttpResponse.json({ result: true, id });
});
