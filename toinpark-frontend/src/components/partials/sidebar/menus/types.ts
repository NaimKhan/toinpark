import { useTranslations } from "next-intl";

export interface INavItem {
  title: string;
  url: string;
   isActive?: boolean;
}

export interface INavGroupItem {
  title: string;
  url: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  isActive?: boolean;
  items?: INavItem[];
}

export type TMenuTranslationFunction = ReturnType<typeof useTranslations<"Menus">>;