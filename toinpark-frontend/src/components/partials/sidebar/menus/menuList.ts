import { adminMenu } from "./adminMenu";
import { TMenuTranslationFunction, type INavGroupItem } from "./types";
import { userMenu } from "./userMenu";

interface IGetMenusProps {
  pathname: string;
  isAdmin?: boolean;
  isSuperAdmin?: boolean;
  t: TMenuTranslationFunction;
}
export const getMenus = ({
  pathname,
  isAdmin,
  isSuperAdmin,
  t,
}: IGetMenusProps): INavGroupItem[] => {
  if (isAdmin) {
    return adminMenu(pathname, t, isSuperAdmin);
  }
  return userMenu(pathname, t);
};
