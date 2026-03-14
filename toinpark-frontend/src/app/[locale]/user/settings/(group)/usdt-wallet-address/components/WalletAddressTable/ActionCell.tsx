"use client";
import React from "react";
import { CellContext } from "@tanstack/react-table";
import { TWalletAddress } from "@/store/api/user-wallet-address/user-wallet-address.types";
import EditWalletAddressModal from "../WalletAddressModals/EditWalletAddressModal";

const ActionCell = ({ row }: CellContext<TWalletAddress, unknown>) => {
  return (
    <div className="flex items-center justify-end gap-2">
      <EditWalletAddressModal id={row.original.id || ""} />
    </div>
  );
};

export default ActionCell;
