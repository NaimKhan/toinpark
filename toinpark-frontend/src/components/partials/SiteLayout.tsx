import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import Header from "./header";
import Footer from "./footer";
import { AppSidebar } from "./sidebar/app-sidebar";
import { useGetUserRole } from "@/hooks/feature/useGetUserRole";

interface ISiteLayoutProps {
  children: React.ReactNode;
}
function SiteLayout({ children }: ISiteLayoutProps) {
  // const {isMember} = useGetUserRole()
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1 pt-20">{children}</main>
          {/* {isMember && } */} <Footer />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default SiteLayout;
