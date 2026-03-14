"use client";
import { Link, usePathname } from "@/components/navigation";
import {
  Settings2,
  User,
  Lock,
  FileText,
  UserCog,
  ArrowLeftRight,
  Layers,
  Trophy,
  Wallet,
} from "lucide-react";

interface IMenuProps {
  icon: React.ReactNode;
  title: string;
  isActive?: boolean;
  href?: string;
}

function SettingsMenu({ icon, title, isActive, href }: IMenuProps) {
  return (
    <Link
      href={href || ""}
      className={`flex items-center justify-start gap-2 px-4 py-2 rounded-md cursor-pointer transition-colors ${
        isActive
          ? "bg-primary text-default-900"
          : "bg-transparent text-default-200 hover:bg-secondary hover:text-default-100"
      }`}
    >
      <div className="w-5 h-5 overflow-hidden flex justify-start items-start">
        {icon}
      </div>
      <span className="font-medium">{title}</span>
    </Link>
  );
}

function SettingsSidebar() {
  const pathName = usePathname();
  return (
    <div className="flex flex-col gap-4 w-full">
      <SettingsMenu
        href="/admin/settings/general-settings"
        icon={<Settings2 className="w-5 h-5" />}
        title="General Settings"
        isActive={pathName.endsWith("/general-settings")}
      />
      <SettingsMenu
        icon={<ArrowLeftRight className="w-5 h-5" />}
        title="USDT to TOIN Conversion"
        href="/admin/settings/toin-conversion-settings"
        isActive={pathName.endsWith("/toin-conversion-settings")}
      />
      <SettingsMenu
        icon={<UserCog className="w-5 h-5" />}
        title="Sub Admin Management"
        href="/admin/settings/sub-admin-management"
        isActive={pathName.includes("/sub-admin-management")}
      />
      <SettingsMenu
        icon={<User className="w-5 h-5" />}
        title="Profile"
        href="/admin/settings/profile-settings"
        isActive={pathName.endsWith("/profile-settings")}
      />
      <SettingsMenu
        icon={<Lock className="w-5 h-5" />}
        title="Change Password"
        href="/admin/settings/change-password"
        isActive={pathName.endsWith("/change-password")}
      />
      <SettingsMenu
        icon={<FileText className="w-5 h-5" />}
        title="White Paper PDF"
        href="/admin/settings/white-paper-pdf"
        isActive={pathName.endsWith("/white-paper-pdf")}
      />
      <SettingsMenu
        icon={<Layers className="w-5 h-5" />}
        title="Referral Level"
        href="/admin/settings/referral-levels"
        isActive={pathName.endsWith("/referral-levels")}
      />
      <SettingsMenu
        icon={<Trophy className="w-5 h-5" />}
        title="Referral Milestone"
        href="/admin/settings/referral-milestone"
        isActive={pathName.endsWith("/referral-milestone")}
      />
      <SettingsMenu
        icon={<Wallet className="w-5 h-5" />}
        title="USDT Wallet Address"
        href="/admin/settings/usdt-wallet-address"
        isActive={pathName.endsWith("/usdt-wallet-address")}
      />
    </div>
  );
}

export default SettingsSidebar;
