import { getMe } from './meHandler';
import { getCampaigns, patchCampaignEnable } from './campaignsHandler';
import { getUsers, checkEmailDuplicate, createUser, editUser } from './usersHandler';

export const handlers = [getMe, getCampaigns, patchCampaignEnable, getUsers, checkEmailDuplicate, createUser, editUser];
