import { getMe } from './meHandler';
import { getCampains, patchCampaignEnable } from './campaignsHandler';
import { getUsers, checkEmailDuplicate } from './usersHandler';

export const handlers = [getMe, getCampains, patchCampaignEnable, getUsers, checkEmailDuplicate];
