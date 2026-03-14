"use client";
import { Link, usePathname } from "@/components/navigation";
import { Wallet } from "lucide-react";

type TMenuProps = {
  icon: React.ReactNode;
  title: string;
  isActive?: boolean;
  href?: string;
}

function SettingsMenu({ icon, title, isActive, href }: TMenuProps) {
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
        href={`/user/settings/usdt-wallet-address`}
        icon={<Wallet className="w-5 h-5" />}
        title="Wallet Address"
        isActive={pathName.endsWith("/usdt-wallet-address")}
      />
    </div>
  );
}

export default SettingsSidebar;
