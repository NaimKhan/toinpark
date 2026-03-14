"use client";

import SubmitButton from "@/components/feature/buttons/SubmitButton";
import CustomDialog from "@/components/popup/CustomDialog";
import { Button } from "@/components/ui/button";
import USDTWalletAddressModalForm from "./USDTWalletAddressModalForm";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { TAddUSDTWalletAddressFormData } from "./USDTWalletaddressModalSchema";
import CommonTooltip from "@/components/feature/tooltip/CommonTooltip";
import { Edit } from "lucide-react";

function EditUSDTWalletAddressModal() {
  const [open, setOpen] = useState(false);
  const form = useForm<TAddUSDTWalletAddressFormData>({
    defaultValues: {
      name: "",
      walletAddress: "",
      image: "",
    },
  });
  const onSubmit = (data: TAddUSDTWalletAddressFormData) => {
    console.log(data);
  };
  const { handleSubmit } = form;
  return (
    <div className="flex justify-end items-center">
      <CommonTooltip content="Edit">
        <Button
          onClick={() => setOpen(true)}
          className="bg-transparent hover:bg-transparent p-2 h-10 text-default-100 hover:text-primary border border-border hover:border-primary rounded-md"
        >
          <Edit />
        </Button>
      </CommonTooltip>

      <CustomDialog
        open={open}
        onClose={() => setOpen(false)}
        title="Edit USDT Wallet Address"
        titleClassName="text-xl"
        hideCancelBtn
        hideConfirmBtn
        className="sm:max-w-[625px]"
        customButtons={
          <>
            <Button
              variant="outline"
              color="destructive"
              className="flex-1 py-3"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <SubmitButton
              onClick={handleSubmit(onSubmit)}
              variant="default"
              className="bg-secondary/80 hover:bg-secondary/60 text-default-100 flex-1 py-3"
            >
              Update
            </SubmitButton>
          </>
        }
      >
        <USDTWalletAddressModalForm form={form} onSubmit={onSubmit} />
      </CustomDialog>
    </div>
  );
}

export default EditUSDTWalletAddressModal;
