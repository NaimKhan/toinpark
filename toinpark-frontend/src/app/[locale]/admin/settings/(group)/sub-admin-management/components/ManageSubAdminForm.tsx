"use client";

import { Controller } from "react-hook-form";
import SubmitButton from "@/components/feature/buttons/SubmitButton";
import { Input } from "@/components/ui/input";
import PasswordInput from "@/components/ui/PasswordInput";
import CheckboxGroup from "@/components/feature/forms/CheckboxGroup";
import { useSubAdminForm } from "./useSubAdminForm";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import { TString } from "@/store/api/common-api-types";

function ManageSubAdminForm() {
  const { getAllParamValue } = useManageSearchParams();
  const { id } = getAllParamValue();
  const { form, control, register, onSubmit, isLoading } = useSubAdminForm({
    subAdminId: id as TString,
  });

  const isEdit = !!id;

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-5 text-default-100"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <Input
            placeholder="Enter First Name"
            label="First Name"
            labelClassName="text-md"
            className="h-12 text-sm font-light"
            {...register("firstName")}
            error={form.formState?.errors?.firstName?.message}
          />
        </div>
        <div>
          <Input
            placeholder="Last Name"
            label="Last Name"
            labelClassName="text-md"
            className="h-12 text-sm font-light"
            {...register("lastName")}
            error={form.formState.errors.lastName?.message}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <Input
            placeholder="Enter Username"
            label="Username"
            type="text"
            labelClassName="text-md"
            className="h-12 text-sm font-light"
            {...register("userName")}
            error={form.formState.errors.userName?.message}
          />
        </div>
        <Input
          placeholder="Enter Email"
          label="Email"
          type="email"
          labelClassName="text-md"
          className="h-12 text-sm font-light"
          {...register("email")}
          error={form.formState.errors.email?.message}
        />
      </div>
      {!isEdit && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <PasswordInput
              id="password"
              placeholder="Enter your password"
              className="h-12"
              labelClassName="text-md"
              autoComplete="new-password"
              {...register("password")}
              error={form.formState.errors.password?.message}
              label="Password"
            />
          </div>
          <div>
            <PasswordInput
              id="confirmPassword"
              placeholder="Enter your Confirm Password"
              className="h-12"
              labelClassName="text-md"
              autoComplete="new-password"
              {...register("passwordConfirmation")}
              error={form.formState.errors.passwordConfirmation?.message}
              label="Confirm Password"
            />
          </div>
        </div>
      )}
      {/* checkbox section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <Controller
            control={control}
            name="memberManagement"
            render={({ field }) => (
              <CheckboxGroup
                title="Member Management"
                field={field}
                items={[
                  { id: "allMemberList", label: "All Member List" },
                  {
                    id: "officialAnnouncement",
                    label: "Official Announcement",
                  },
                  { id: "blockedMemberList", label: "Blocked Member List" },
                ]}
              />
            )}
          />

          <Controller
            control={control}
            name="reportsManagement"
            render={({ field }) => (
              <CheckboxGroup
                title="Reports Management"
                field={field}
                items={[
                  {
                    id: "directMemberReports",
                    label: "Direct Member Reports",
                  },
                  {
                    id: "downlineMemberReports",
                    label: "Downline Member Reports",
                  },
                  {
                    id: "recentTransactionReport",
                    label: "Recent Transaction Report",
                  },
                  { id: "roiIncome", label: "ROI Income" },
                ]}
              />
            )}
          />

          <Controller
            control={control}
            name="queryTicketsManagement"
            render={({ field }) => (
              <CheckboxGroup
                title="Query Tickets Management"
                field={field}
                items={[
                  { id: "openTicketManage", label: "Open Ticket Manage" },
                  { id: "closeTicketManage", label: "Close Ticket Manage" },
                ]}
              />
            )}
          />

          <Controller
            control={control}
            name="settingsManagement"
            render={({ field }) => (
              <CheckboxGroup
                title="Settings Management"
                field={field}
                items={[
                  { id: "changePassword", label: "Change Password" },
                  { id: "changeProfilePhoto", label: "Change Profile Photo" },
                ]}
              />
            )}
          />

          <Controller
            control={control}
            name="subAdminManagement"
            render={({ field }) => (
              <CheckboxGroup
                title="Sub Admin Management"
                field={field}
                items={[
                  { id: "subAdminManagement", label: "Sub Admin Management" },
                ]}
              />
            )}
          />
        </div>

        <div>
          <Controller
            control={control}
            name="investmentManagement"
            render={({ field }) => (
              <CheckboxGroup
                title="Investment Management"
                field={field}
                items={[
                  {
                    id: "pendingInvestmentRequest",
                    label: "Pending Investment Request",
                  },
                  {
                    id: "approvedInvestmentRequest",
                    label: "Approved Investment Request",
                  },
                  {
                    id: "rejectedInvestmentRequest",
                    label: "Rejected Investment Request",
                  },
                ]}
              />
            )}
          />
          <Controller
            control={control}
            name="walletManagement"
            render={({ field }) => (
              <CheckboxGroup
                title="Wallet Management"
                field={field}
                items={[
                  { id: "manageUserEwallet", label: "Manage User Ewallet" },
                ]}
              />
            )}
          />
          <Controller
            control={control}
            name="fundRequest"
            render={({ field }) => (
              <CheckboxGroup
                title="Fund Request"
                field={field}
                items={[
                  { id: "pendingFundRequest", label: "Pending Fund Request" },
                  {
                    id: "approvedFundRequest",
                    label: "Approved Fund Request",
                  },
                  { id: "cancelFundRequest", label: "Cancel Fund Request" },
                ]}
              />
            )}
          />
          <Controller
            control={control}
            name="withdrawalManagement"
            render={({ field }) => (
              <CheckboxGroup
                title="Withdrawal Management"
                field={field}
                items={[
                  {
                    id: "openWithdrawalRequest",
                    label: "Open Withdrawal Request",
                  },
                  {
                    id: "closeWithdrawalRequest",
                    label: "Close Withdrawal Request",
                  },
                ]}
              />
            )}
          />
          <Controller
            control={control}
            name="rankAchievers"
            render={({ field }) => (
              <CheckboxGroup
                title="Rank Achievers"
                field={field}
                items={[
                  { id: "rankWiseMember", label: "Rank Wise Member" },
                  { id: "rankAchievers", label: "Rank Achievers" },
                ]}
              />
            )}
          />
        </div>
      </div>

      <SubmitButton
        isLoading={isLoading}
        variant="default"
        className="!h-12 w-full px-4 md:px-6 text-sm md:text-md font-light md:font-medium text-default-900 "
      >
        Submit
      </SubmitButton>
    </form>
  );
}

export default ManageSubAdminForm;
