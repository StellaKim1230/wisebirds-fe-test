import { getMe } from './meHandler';
import { getCampaigns, patchCampaignEnable } from './campaignsHandler';
import { getUsers, checkEmailDuplicate, createUser } from './usersHandler';

export const handlers = [getMe, getCampaigns, patchCampaignEnable, getUsers, checkEmailDuplicate, createUser];
