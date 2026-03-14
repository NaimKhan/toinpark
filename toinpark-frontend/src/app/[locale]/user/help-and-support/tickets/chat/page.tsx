import GradientText from "@/components/feature/text/gradientText";
import { getSeoMeta } from "@/lib/getSeoMeta";
export const metadata = getSeoMeta({ title: "Ticket Chat" });
import Link from "next/link";
import LeftArrow from "@/components/svg/LeftArrow";
import CommonTooltip from "@/components/feature/tooltip/CommonTooltip";
import { Button } from "@/components/ui/button";
import ChatPageContent from "@/components/chat/ChatPageContent";
import useDefaultLocale from "@/hooks/useDefaultLocale";

function TicketsChatPage() {
  const local = useDefaultLocale();
  return (
    <div className="px-6 xl:px-16 md:px-10 mt-4">
      <div className="flex items-center justify-between">
        <GradientText
          type="secondary"
          label="Ticket Chat"
          className="text-[28px] md:text-4xl lg:text-5xl font-medium flex-1"
        />
        <div className="flex items-end justify-end">
          <CommonTooltip content="Back">
            <Button
              asChild
              variant="default"
              className="bg-transparent border border-input md:border-none md:bg-input text-lg text-default-100 hover:text-default-900 px-2 md:px-4 !h-10 !md:h-12 "
            >
              <Link
                href={`/${local}/user/help-and-support/tickets?tab="ticketResponses"`}
              >
                <LeftArrow className="!w-6 !h-6" />
              </Link>
            </Button>
          </CommonTooltip>
        </div>
      </div>

      <ChatPageContent />
    </div>
  );
}

export default TicketsChatPage;
