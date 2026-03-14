import DashboardIcon from "@/components/svg/DashboardIcon";
import { INavGroupItem, TMenuTranslationFunction } from "./types";
import StackIcon from "@/components/svg/StackIcon";
import TokenIcon from "@/components/svg/TokenIcon";
import RewardIcon from "@/components/svg/RewardIcon";
import SupportIcon from "@/components/svg/SupportIcon";
import TOIAnnouncementIcon from "@/components/svg/TOIAnnouncementIcon";

export const userMenu = (
  pathname: string,
  t: TMenuTranslationFunction
): INavGroupItem[] => [
  {
    title: t("dashboard"),
    url: "/user/dashboard",
    icon: DashboardIcon,
    isActive: pathname.includes("/dashboard"),
  },
  {
    title: t("stakingCenter"),
    url: "/user/staking-center",
    icon: StackIcon,
    isActive: pathname.includes("/staking-center"),
  },
  {
    title: t("tokens"),
    url: "/user/tokens",
    icon: TokenIcon,
    isActive: pathname.includes("/tokens"),
  },
  {
    title: t("rewards"),
    url: "#",
    icon: RewardIcon,
    isActive: pathname.includes("/rewards"),
    items: [
      {
        title: t("myTeam"),
        url: "/user/rewards/my-team",
        isActive: pathname.endsWith("/my-team"),
      },
      {
        title: t("referralIncome"),
        url: "/user/rewards/referral-income",
        isActive: pathname.endsWith("/referral-income"),
      },
    ],
  },
  {
    title: t("helpAndSupport"),
    url: "#",
    icon: SupportIcon,
    isActive: pathname.includes("/help-and-support"),
    items: [
      {
        title: t("tickets"),
        url: "/user/help-and-support/tickets",
        isActive: pathname.endsWith("/help-and-support/tickets"),
      },
      {
        title: t("Tutorials"),
        url: "/user/help-and-support/tutorials",
        isActive: pathname.endsWith("/help-and-support/tutorials"),
      },
      {
        title: t("contactUs"),
        url: "/user/help-and-support/contact-us",
        isActive: pathname.endsWith("/help-and-support/contact-us"),
      },
    ],
  },
  {
    title: t("toinAnnouncements"),
    url: "/user/toi-announcements",
    icon: TOIAnnouncementIcon,
    isActive: pathname.endsWith("/toi-announcements"),
  },
];
