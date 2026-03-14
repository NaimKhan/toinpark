import DashboardIcon from "@/components/svg/DashboardIcon";
import StackIcon from "@/components/svg/StackIcon";
import TokenIcon from "@/components/svg/TokenIcon";
import RewardIcon from "@/components/svg/RewardIcon";
import SupportIcon from "@/components/svg/SupportIcon";

const menuItems = [
  { id: 1, label: "Dashboard", icon: <DashboardIcon className="!w-8 !h-8" />, active: true },
  { id: 2, label: "Staking center", icon: <StackIcon className="!w-8 !h-8" />, active: false },
  { id: 3, label: "Tokens", icon: <TokenIcon className="!w-8 !h-8" />, active: false },
  { id: 4, label: "Rewards", icon: <RewardIcon className="!w-8 !h-8" />, active: false },
  { id: 5, label: "Help & Support", icon: <SupportIcon className="!w-8 !h-8" />, active: false },
];

function FooterMenu() {
  return (
    <div className="w-full bg-background text-default-200 flex  justify-around items-center py-3 border-t border-border">
      {menuItems.map((item) => (
        <div
          key={item.id}
          className={`flex flex-col items-center gap-1 cursor-pointer transition-all ${
            item.active ? "text-primary" : "hover:text-primary"
          }`}
        >
          <div
            className={`p-1 rounded-xl ${
              item.active ? "bg-transparent" : "bg-transparent"
            }`}
          >
            {item.icon}
          </div>
          <p className="text-[10px] font-normal tracking-[-0.04px] text-center ">{item.label}</p>
        </div>
      ))}
    </div>
  );
}

export default FooterMenu;
