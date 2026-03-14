import SubmitButton from "@/components/feature/buttons/SubmitButton";
import RenderData from "@/components/feature/loader/RenderData";
import CommonTooltip from "@/components/feature/tooltip/CommonTooltip";
import CustomDialog from "@/components/popup/CustomDialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { applyFieldErrors } from "@/lib/errors/applyFieldErrors";
import { getApiMessage, getFieldErrors } from "@/lib/errors/getFieldErrors";
import { TString } from "@/store/api/common-api-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import RegisteredMemberForm from "./RegisteredMemberForm";
import {
  useGetAMemberQuery,
  useUpdateMemberMutation,
} from "@/store/api/members/members-api";
import { memberSchema, TEditMemberFormData } from "./addRegisteredMemberSchema";
import ContentLoader from "@/components/feature/loader/ContentLoader";

export default function EditRegisteredMemberModal({
  memberId,
}: {
  memberId: TString;
}) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const { data: getMemberRes, ...getMemberState } = useGetAMemberQuery(
    { id: memberId },
    { skip: !open },
  );

  const memberData = getMemberRes?.data;

  const [updateMember, { isLoading }] = useUpdateMemberMutation();

  const form = useForm<TEditMemberFormData>({
    resolver: zodResolver(memberSchema),
    mode: "onTouched",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      addressLine1: "",
      city: "",
      stateId: "",
      countryId: "",
      zipCode: "",
    },
  });

  useEffect(() => {
    if (memberData) {
      form.reset({
        email: memberData.email ?? "",
        phoneNumber: memberData.phoneNumber ?? "",
        firstName: memberData.userProfile?.firstName ?? "",
        lastName: memberData.userProfile?.lastName ?? "",
        password: "",
        addressLine1: memberData.userProfile?.addressLine1 ?? "",
        city: memberData.userProfile?.city ?? "",
        stateId: memberData.userProfile?.stateId ?? "",
        countryId: memberData.userProfile?.countryId ?? "",
        zipCode: memberData.userProfile?.zipCode ?? "",
      });
    }
  }, [memberData, form]);

  const onSubmit = async (data: TEditMemberFormData) => {
    const toastId = toast({
      variant: "loading",
      title: "Loading...",
      description: "Please wait while we update the member",
    });

    try {
      await updateMember({
        id: memberId,
        body: data,
      }).unwrap();

      toastId.update({
        id: toastId.id,
        variant: "success",
        title: "Success",
        description: "Member updated successfully",
      });

      form.reset();
      setOpen(false);
    } catch (error) {
      const fieldErrors = getFieldErrors(error);
      applyFieldErrors(fieldErrors, form.setError);

      toastId.update({
        id: toastId.id,
        variant: "error",
        title: getApiMessage(error) || "Failed to update member",
        description: "Please try again",
      });
    }
  };

  const handleConfirm = () => {
    form.handleSubmit(onSubmit)();
  };

  return (
    <>
      <CommonTooltip content="Edit Member">
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
        title="Edit Registered Member"
        className="sm:max-w-[650px]"
        hideCancelBtn
        hideConfirmBtn
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
              onClick={handleConfirm}
              isLoading={isLoading}
              className="bg-secondary/80 hover:bg-secondary/60 text-default-100 flex-1 py-3"
            >
              Update
            </SubmitButton>
          </>
        }
      >
        <RenderData
          expectedDataType="object"
          data={memberData}
          {...getMemberState}
          loadingSkeleton={<ContentLoader />}
        >
          <RegisteredMemberForm
            form={form}
            onSubmit={onSubmit}
            isEdit={true}
          />
        </RenderData>
      </CustomDialog>
    </>
  );
}
