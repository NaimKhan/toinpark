import WalletAddressTable from "./components/WalletAddressTable";
import AddWalletAddressModal from "./components/WalletAddressModals/AddWalletAddressModal";

export default function USDTWalletAddressPage() {
  return (
    <div>
      <AddWalletAddressModal />
      <WalletAddressTable />
    </div>
  );
}
