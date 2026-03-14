import { getSeoMeta } from "@/lib/getSeoMeta";
import PageNotFound from "@/components/feature/page-states/PageNotFound";

export const metadata = getSeoMeta({ title: "Page Not Found" });

function NotFoundPage() {
  return <PageNotFound />;
}

export default NotFoundPage;
