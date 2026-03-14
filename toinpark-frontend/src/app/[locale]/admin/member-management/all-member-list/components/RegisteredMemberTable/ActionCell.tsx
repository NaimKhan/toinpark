"use client";

import { CellContext } from "@tanstack/react-table";
import EditRegisteredMemberModal from "../RegisteredMemberModal/EditRegisteredMemberModal";
import { TMember } from "@/store/api/members/members.types";

export default function ActionCell({
  row: { original },
}: CellContext<TMember, unknown>) {
  return (
    <div className="flex items-center last:justify-end gap-2">
      <EditRegisteredMemberModal memberId={original?.id} />
    </div>
  );
}
