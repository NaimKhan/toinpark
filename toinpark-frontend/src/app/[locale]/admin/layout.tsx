import SiteLayout from "@/components/partials/SiteLayout";
import { getSeoMeta } from "@/lib/getSeoMeta";

export const metadata = getSeoMeta({ title: "Admin Dashboard" });

interface IAdminLayoutProps {
  children: React.ReactNode;
}
function AdminLayout({ children }: IAdminLayoutProps) {
  return <SiteLayout>{children}</SiteLayout>;
}

export default AdminLayout;
