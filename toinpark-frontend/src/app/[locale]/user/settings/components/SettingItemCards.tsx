import { Wallet } from "lucide-react";
import { useLocale } from "next-intl";
import SettingItemCard from "./SettingItemCard";

export default function SettingItemCards() {
  const locale = useLocale();
  return (
    <div className="p-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <SettingItemCard
        href={`/${locale}/user/settings/usdt-wallet-address`}
        title="USDT Wallet Address"
        description="Manage USDT wallet addresses for your project."
        icon={<Wallet />}
      />
    </div>
  );
}
