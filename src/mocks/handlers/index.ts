import { getCampains, patchCampaignEnable } from './campaignsHandler';
import { getMe } from './meHandler';

export const handlers = [getMe, getCampains, patchCampaignEnable];
