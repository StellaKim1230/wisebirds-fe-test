import { proxy } from 'valtio';
import { MenuPermission } from '../types/menu';

interface MenuStore {
  permission: MenuPermission;
  updatePermission: (permission: MenuPermission) => void;
}

export const menuStore: MenuStore = proxy<MenuStore>({
  permission: MenuPermission.ADMIN,
  updatePermission: (permission: MenuPermission) => (menuStore.permission = permission),
});
