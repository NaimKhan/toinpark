import DashboardIcon from "@/components/svg/DashboardIcon";
import { INavGroupItem, TMenuTranslationFunction } from "./types";
import UsersIcon from "@/components/svg/UsersIcon";
import StackIcon from "@/components/svg/StackIcon";
import TrendingUpIcon from "@/components/svg/TrendingUpIcon";
import UserIcon from "@/components/svg/UserIcon";
import MessageSquareTextIcon from "@/components/svg/MessageSquareTextIcon";
import HistoryIcon from "@/components/svg/HistoryIcon";
import TokenIcon from "@/components/svg/TokenIcon";
import AnnouncementIcon from "@/components/svg/AnnouncementIcon";
import ClipboardIcon from "@/components/svg/ClipboardIcon";
import SettingsIcon from "@/components/svg/SettingsIcon";

// Force reload
export const adminMenu = (
  pathname: string,
  t: TMenuTranslationFunction,
  isSuperAdmin?: boolean,
): INavGroupItem[] => [
  {
    title: t("dashboard"),
    url: "/admin",
    icon: DashboardIcon,
    isActive: pathname.endsWith("/admin"),
  },
  ...(isSuperAdmin
    ? [
        {
          title: t("memberManagement"),
          url: "/admin/member-management",
          icon: UserIcon,
          isActive: pathname.includes("/admin/member-management"),
          items: [
            {
              title: t("allMemberList"),
              url: "/admin/member-management/all-member-list",
              isActive: pathname.endsWith("/all-member-list"),
            },

            {
              title: t("blockedMemberList"),
              url: "/admin/member-management/blocked-member-list",
              isActive: pathname.endsWith("/blocked-member-list"),
            },
          ],
        },
      ]
    : []),

  {
    title: t("reportsManagement"),
    url: "/admin/reports-management",
    icon: TrendingUpIcon,
    isActive: pathname.includes("/admin/reports-management"),
    items: [
      {
        title: t("directMemberReports"),
        url: "/admin/reports-management/direct-member-reports",
        isActive: pathname.endsWith("/direct-member-reports"),
      },
      {
        title: t("memberSummaryReport"),
        url: "/admin/reports-management/member-summary-report",
        isActive: pathname.endsWith("/member-summary-report"),
      },
      {
        title: t("downlineMemberReports"),
        url: "/admin/reports-management/downline-member-reports",
        isActive: pathname.endsWith("/downline-member-reports"),
      },
      {
        title: t("recentTransactionReports"),
        url: "/admin/reports-management/recent-transaction-reports",
        isActive: pathname.endsWith("/recent-transaction-reports"),
      },
    ],
  },

  {
    title: t("walletManagement"),
    url: "/admin/wallet-management",
    icon: StackIcon,
    isActive: pathname.includes("/admin/wallet-management"),
    items: [
      {
        title: t("manageUserEwallet"),
        url: "/admin/wallet-management/manage-user-ewallet",
        isActive: pathname.endsWith("/manage-user-ewallet"),
      },
      {
        title: t("manageWallet"),
        url: "/admin/wallet-management/manage-wallet",
        isActive: pathname.endsWith("/manage-wallet"),
      },
      {
        title: t("addFundHistory"),
        url: "/admin/wallet-management/add-fund-history",
        isActive: pathname.endsWith("/add-fund-history"),
      },
      {
        title: t("deductFundHistory"),
        url: "/admin/wallet-management/deduct-fund-history",
        isActive: pathname.endsWith("/deduct-fund-history"),
      },
    ],
  },
  {
    title: t("principalWithdrawalManagement"),
    url: "/admin/principal-withdrawal-management",
    icon: HistoryIcon,
    isActive: pathname.includes("/admin/principal-withdrawal-management"),
    items: [
      {
        title: t("pendingWithdrawalRequestUsdt"),
        url: "/admin/principal-withdrawal-management/pending-withdrawal-request-usdt",
        isActive: pathname.endsWith("/pending-withdrawal-request-usdt"),
      },
      {
        title: t("approvedWithdrawalRequest"),
        url: "/admin/principal-withdrawal-management/approved-withdrawal-request",
        isActive: pathname.endsWith("/approved-withdrawal-request"),
      },
      {
        title: t("cancelWithdrawalRequest"),
        url: "/admin/principal-withdrawal-management/cancel-withdrawal-request",
        isActive: pathname.endsWith("/cancel-withdrawal-request"),
      },
    ],
  },
  {
    title: t("queryTicketManagement"),
    url: "/admin/query-ticket-management",
    icon: TokenIcon,
    isActive: pathname.includes("/admin/query-ticket-management"),
    items: [
      {
        title: t("ticketCategory"),
        url: "/admin/query-ticket-management/ticket-category",
        isActive: pathname.endsWith("/ticket-category"),
      },
      {
        title: t("ticketManagement"),
        url: "/admin/query-ticket-management/ticket-management",
        isActive: pathname.endsWith("/ticket-management"),
      },
    ],
  },
  {
    title: t("officialAnnouncements"),
    url: "/admin/official-announcements",
    icon: AnnouncementIcon,
    isActive: pathname.includes("/admin/official-announcements"),
    items: [
      {
        title: t("categories"),
        url: "/admin/official-announcements/categories",
        isActive: pathname.endsWith("/categories"),
      },
      {
        title: t("announcements"),
        url: "/admin/official-announcements/announcements",
        isActive: pathname.endsWith("/announcements"),
      },
    ],
  },
  {
    title: t("tutorials"),
    url: "/admin/tutorials",
    icon: MessageSquareTextIcon,
    isActive: pathname.includes("/admin/tutorials"),
    items: [
      {
        title: t("category"),
        url: "/admin/tutorials/category",
        isActive: pathname.endsWith("/category"),
      },
      {
        title: t("tutorial"),
        url: "/admin/tutorials/tutorial",
        isActive: pathname.endsWith("/tutorial"),
      },
    ],
  },
  {
    title: t("stakingPackagePlan"),
    url: "/admin/staking-package-plan",
    icon: TokenIcon,
    isActive: pathname.includes("/admin/staking-package-plan"),
  },
  {
    title: t("airdropEvents"),
    url: "/admin/airdrop-events",
    icon: ClipboardIcon,
    isActive: pathname.includes("/admin/airdrop-events"),
  },
  {
    title: t("communityEvents"),
    url: "/admin/community-events",
    icon: UsersIcon,
    isActive: pathname.includes("/admin/community-events"),
  },

  {
    title: t("settings"),
    url: "/admin/settings",
    icon: SettingsIcon,
    isActive: pathname.includes("/admin/settings"),
  },
];
