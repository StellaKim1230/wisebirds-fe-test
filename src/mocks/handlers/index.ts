import { getMe } from './meHandler';
import { getCampains, patchCampaignEnable } from './campaignsHandler';
import { getUsers } from './usersHandler';

export const handlers = [getMe, getCampains, patchCampaignEnable, getUsers];
