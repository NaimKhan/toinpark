import { TGetMyTickets } from "@/store/api/tickets/tickets.types";
import { CellContext } from "@tanstack/react-table";
import Link from "next/link";
import useDefaultLocale from "@/hooks/useDefaultLocale";

export default function ActionCell({
  row: { original },
}: CellContext<TGetMyTickets, unknown>) {
  const local = useDefaultLocale();
  return (
    <span>
      <Link
        href={`/${local}/user/help-and-support/tickets/chat?ticketId=${original.id}`}
        className="px-4 py-2 border border-primary/50 rounded text-base font-medium text-primary"
      >
        View
      </Link>
    </span>
  );
}
