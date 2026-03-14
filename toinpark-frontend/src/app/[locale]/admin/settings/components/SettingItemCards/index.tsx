import SettingItemCard from "../SettingItemCard";
import {
  Settings2,
  DollarSign,
  UserCheck,
  User,
  Lock,
  FileText,
  Layers,
  Trophy,
  Wallet,
} from "lucide-react";
import { useLocale } from "next-intl";

export default function SettingItemCards() {
  const locale = useLocale();
  return (
    <div className="p-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <SettingItemCard
        href={`/${locale}/admin/settings/general-settings`}
        title="General Settings"
        description="Manage general settings for your account, including notifications."
        icon={<Settings2 />}
      />
      <SettingItemCard
        href={`/${locale}/admin/settings/toin-conversion-settings`}
        title="USDT to TOIN Conversion"
        description="Manage USDT to TOIN conversion rates and configure automatic ."
        icon={<DollarSign />}
      />
      <SettingItemCard
        href={`/${locale}/admin/settings/sub-admin-management`}
        title="Sub Admin Management"
        description="Manage sub admin accounts, set permissions, and control their access."
        icon={<UserCheck />}
      />
      <SettingItemCard
        href={`/${locale}/admin/settings/profile-settings`}
        title="Profile Settings"
        description="Update your profile information, change avatar, and adjust account ."
        icon={<User />}
      />
      <SettingItemCard
        href={`/${locale}/admin/settings/change-password`}
        title="Change Password"
        description="Update your account password securely, and manage password."
        icon={<Lock />}
      />
      <SettingItemCard
        href={`/${locale}/admin/settings/white-paper-pdf`}
        title="White Paper PDF"
        description="Manage and upload the white paper PDF for your project."
        icon={<FileText />}
      />
      <SettingItemCard
        href={`/${locale}/admin/settings/referral-levels`}
        title="Referral Levels"
        description="Manage referral levels and their rewards."
        icon={<Layers />}
      />
      <SettingItemCard
        href={`/${locale}/admin/settings/referral-milestone`}
        title="Referral Milestone"
        description="Manage referral milestones and their rewards."
        icon={<Trophy />}
      />
      <SettingItemCard
        href={`/${locale}/admin/settings/usdt-wallet-address`}
        title="USDT Wallet Address"
        description="Manage USDT wallet addresses for your project."
        icon={<Wallet />}
      />
    </div>
  );
}
