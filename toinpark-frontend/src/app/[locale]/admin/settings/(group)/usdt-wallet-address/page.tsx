import { getSeoMeta } from "@/lib/getSeoMeta";
import AddUSDTWalletAddressModal from "./components/USDTWalletAddressModal/AddUSDTWalletAddressModal";
import USDTWalletAddressTable from "./components/USDTWalletAddressTable";

export const metadata = getSeoMeta({ title: "USDT Wallet Address" });

function USDTWalletAddress() {
  return (
    <div>
      <AddUSDTWalletAddressModal />
      <USDTWalletAddressTable />
    </div>
  );
}

export default USDTWalletAddress;
