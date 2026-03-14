import SiteLayout from "@/components/partials/SiteLayout";

interface IUserLayoutProps {
  children: React.ReactNode;
}
function UserLayout({ children }: IUserLayoutProps) {
  return <SiteLayout>{children}</SiteLayout>;
}

export default UserLayout;
