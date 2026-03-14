"use client";

import CustomDialog from "@/components/popup/CustomDialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import SubmitButton from "@/components/feature/buttons/SubmitButton";
import {
  useGetAUserWalletAddressQuery,
  useUpdateUserWalletAddressMutation,
} from "@/store/api/user-wallet-address/user-wallet-address-api";
import { getApiMessage, getFieldErrors } from "@/lib/errors/getFieldErrors";
import { applyFieldErrors } from "@/lib/errors/applyFieldErrors";
import { showApiToast } from "@/lib/toast/api-toast";
import { Edit, Edit2 } from "lucide-react";
import {
  TAddWalletAddressFormData,
  walletAddressSchema,
} from "./walletAddressSchema";
import WalletAddressModalForm from "./WalletAddressModalForm";
import CommonTooltip from "@/components/feature/tooltip/CommonTooltip";

interface EditWalletAddressModalProps {
  id: string;
}

export default function EditWalletAddressModal({
  id,
}: EditWalletAddressModalProps) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const [updateUserWalletAddress] = useUpdateUserWalletAddressMutation();
  const { data: walletAddress, isSuccess } = useGetAUserWalletAddressQuery(
    { id },
    { skip: !open },
  );

  const form = useForm<TAddWalletAddressFormData>({
    resolver: zodResolver(walletAddressSchema),
    defaultValues: {
      name: "",
      walletAccountId: "",
    },
  });

  const { reset, handleSubmit } = form;

  useEffect(() => {
    if (isSuccess && walletAddress?.data) {
      reset({
        name: walletAddress.data.name || "",
        walletAccountId: walletAddress.data.walletAccountId || "",
      });
    }
  }, [isSuccess, walletAddress, reset]);

  const onSubmit = async (data: TAddWalletAddressFormData) => {
    const toastId = toast({
      variant: "loading",
      title: "Loading...",
      description: "Please wait while we update the Wallet Address",
    });
    try {
      const response = await updateUserWalletAddress({
        id,
        body: data,
      }).unwrap();

      showApiToast({
        toastId: toastId.id,
        response,
        title: "Success",
        description: "Wallet Address has been updated successfully.",
      });

      setOpen(false);
    } catch (error) {
      const fieldErrors = getFieldErrors(error);
      applyFieldErrors(fieldErrors, form.setError);
      toastId.update({
        id: toastId.id,
        variant: "error",
        title: "Error",
        description: getApiMessage(error) || "Failed to update Wallet Address.",
      });
    }
  };

  return (
    <>
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
        title="Edit Wallet Address"
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
        <WalletAddressModalForm form={form} onSubmit={onSubmit} />
      </CustomDialog>
    </>
  );
}
