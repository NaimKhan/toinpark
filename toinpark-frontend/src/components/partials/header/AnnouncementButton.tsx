import AnnouncementIcon from "@/components/svg/AnnouncementIcon";
import { Button } from "@/components/ui/button";
function AnnouncementButton() {
  return (
    <Button
      variant="outline"
      className="!h-10 lg:!h-12 hover:bg-primary/10 text-default-300 hover:text-primary !p-1 lg:!p-2"
    >
      <AnnouncementIcon className="size-9 cursor-pointer " />
    </Button>
  );
}

export default AnnouncementButton;
