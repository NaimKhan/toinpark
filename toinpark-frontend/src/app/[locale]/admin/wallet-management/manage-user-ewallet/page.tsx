import { getSeoMeta } from "@/lib/getSeoMeta";
import PageHeader from "@/components/layout/PageHeader";
import ManageUserEwalletTable from "./components/ManageUserEwalletTable";

export const metadata = getSeoMeta({ title: "User E-Wallet Management" });

function ManageUserEwallet() {
  return (
    <PageHeader title="Wallet Management">
      <ManageUserEwalletTable />
    </PageHeader>
  );
}

export default ManageUserEwallet;
