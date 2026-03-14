"use client";

import CustomDialog from "@/components/popup/CustomDialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import SubmitButton from "@/components/feature/buttons/SubmitButton";
import GradientText from "@/components/feature/text/gradientText";
import { useCreateUserWalletAddressMutation } from "@/store/api/user-wallet-address/user-wallet-address-api";
import { getApiMessage, getFieldErrors } from "@/lib/errors/getFieldErrors";
import { applyFieldErrors } from "@/lib/errors/applyFieldErrors";
import { showApiToast } from "@/lib/toast/api-toast";
import {
  TAddWalletAddressFormData,
  walletAddressSchema,
} from "./walletAddressSchema";
import WalletAddressModalForm from "./WalletAddressModalForm";

export default function AddWalletAddressModal() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const [createUserWalletAddress] = useCreateUserWalletAddressMutation();

  const form = useForm<TAddWalletAddressFormData>({
    resolver: zodResolver(walletAddressSchema),
    defaultValues: {
      name: "",
      walletAccountId: "",
    },
  });

  const { reset, handleSubmit } = form;

  const onSubmit = async (data: TAddWalletAddressFormData) => {
    const toastId = toast({
      variant: "loading",
      title: "Loading...",
      description: "Please wait while we add the Wallet Address",
    });
    try {
      const response = await createUserWalletAddress(data).unwrap();

      showApiToast({
        toastId: toastId.id,
        response,
        title: "Success",
        description: "Wallet Address has been created successfully.",
      });

      reset();
      setOpen(false);
    } catch (error) {
      const fieldErrors = getFieldErrors(error);
      applyFieldErrors(fieldErrors, form.setError);
      toastId.update({
        id: toastId.id,
        variant: "error",
        title: "Error",
        description: getApiMessage(error) || "Failed to add Wallet Address.",
      });
    }
  };

  return (
    <div className="flex justify-end items-center mb-6">
      <div className="text-default-100 w-full flex gap-4 items-center justify-between p-4 bg-border/50 flex-wrap rounded-lg rounded-none">
        <GradientText
          label="USDT Wallet Address"
          className="text-xl font-semibold whitespace-nowrap"
        />
        <Button onClick={() => setOpen(true)} className="h-10 text-sm">
          Add Wallet Address
        </Button>
      </div>

      <CustomDialog
        open={open}
        onClose={() => setOpen(false)}
        title="Add Wallet Address"
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
        <WalletAddressModalForm form={form} onSubmit={onSubmit} />
      </CustomDialog>
    </div>
  );
}
