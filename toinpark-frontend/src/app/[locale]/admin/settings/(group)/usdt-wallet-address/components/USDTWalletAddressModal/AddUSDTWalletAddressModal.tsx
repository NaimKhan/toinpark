"use client";

import SubmitButton from "@/components/feature/buttons/SubmitButton";
import GradientText from "@/components/feature/text/gradientText";
import CustomDialog from "@/components/popup/CustomDialog";
import { Button } from "@/components/ui/button";
import USDTWalletAddressModalForm from "./USDTWalletAddressModalForm";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { TAddUSDTWalletAddressFormData } from "./USDTWalletaddressModalSchema";

function AddUSDTWalletAddressModal() {
  const [open, setOpen] = useState(false);
  const form = useForm<TAddUSDTWalletAddressFormData>({
    defaultValues: {
      walletAddress: "",
    },
  });
  const onSubmit = (data: TAddUSDTWalletAddressFormData) => {
    console.log(data);
  };
  const { handleSubmit } = form;
  return (
    <div className="flex justify-end items-center">
      <div className="text-default-100 w-full flex gap-4 items-center justify-between p-4 bg-border/50 flex-wrap">
        <GradientText
          label="USDT Wallet Address"
          className="text-xl font-semibold whitespace-nowrap"
        />
        <Button onClick={() => setOpen(true)} className="h-10 text-sm">
          Add USDT Wallet Address
        </Button>
      </div>

      <CustomDialog
        open={open}
        onClose={() => setOpen(false)}
        title="USDT Wallet Address"
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
              Submit
            </SubmitButton>
          </>
        }
      >
        <USDTWalletAddressModalForm form={form} onSubmit={onSubmit} />
      </CustomDialog>
    </div>
  );
}

export default AddUSDTWalletAddressModal;
