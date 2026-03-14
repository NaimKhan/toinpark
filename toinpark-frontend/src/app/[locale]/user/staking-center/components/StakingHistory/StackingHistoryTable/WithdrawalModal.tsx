"use client";

import React, { useState } from "react";
import CustomDialog from "@/components/popup/CustomDialog";
import { Button } from "@/components/ui/button";
import SubmitButton from "@/components/feature/buttons/SubmitButton";
import { Input } from "@/components/ui/input";
import { useGetSystemSettingsQuery } from "@/store/api/system-settings/system-settings-api";
import { useGetUserWalletAddressesQuery } from "@/store/api/user-wallet-address/user-wallet-address-api";
import { TUserStakingPackageItem } from "@/store/api/user-staking-package/user-staking-package.type";
import { useCreateWithdrawalRequestMutation } from "@/store/api/withdrawal-requests/withdrawal-requests-api";
import { showApiToast } from "@/lib/toast/api-toast";

interface WithdrawalModalProps {
  data: TUserStakingPackageItem;
}

const WithdrawalModal: React.FC<WithdrawalModalProps> = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [requestedUSDT, setRequestedUSDT] = useState<string>("");
  const { data: systemSettingsRes } = useGetSystemSettingsQuery();
  const { data: walletAddressRes } = useGetUserWalletAddressesQuery({});
  const [createWithdrawalRequest, { isLoading: isSubmitting }] =
    useCreateWithdrawalRequestMutation();

  const defaultWallet = walletAddressRes?.data?.items?.find(
    (item) => item.isDefault,
  );
  const destinationWallet = defaultWallet?.walletAccountId || "-";

  const platformWithdrawalFeePercentage =
    systemSettingsRes?.data?.platformWithdrawalFeePercentage ?? 0;

  const requestedAmount = parseFloat(requestedUSDT) || 0;
  const usdConversionRate =
    data.usdConversionRate || systemSettingsRes?.data?.usdConversionRate || 0;
  const toinToDeduct = requestedAmount / usdConversionRate;

  const netReceivable =
    requestedAmount > 0
      ? Math.max(
          0,
          requestedAmount -
            requestedAmount * (platformWithdrawalFeePercentage / 100),
        )
      : 0;

  const totalPendingApprovedWithdrawals = (data.withdrawalRequests || [])
    .filter((req) => req.status === "PENDING" || req.status === "APPROVED")
    .reduce((sum, req) => sum + (req.amount || 0), 0);

  const totalStakingAdjustments = (data.stakingAdjustments || []).reduce(
    (sum, adj) => sum + (adj.usdtAmount || 0),
    0,
  );

  const minUSDTWithdrawalAmount =
    systemSettingsRes?.data?.minUSDTWithdrawalAmount ?? 0;

  const remainingUSDT =
    (data.usdtAmount || 0) -
    (totalPendingApprovedWithdrawals +
      totalStakingAdjustments +
      requestedAmount);

  const isInsufficientBalance = remainingUSDT < 0;

  const isBelowMinWithdrawal =
    requestedAmount > 0 && requestedAmount < minUSDTWithdrawalAmount;

  const isInvalidRemaining =
    remainingUSDT > 0 && remainingUSDT < minUSDTWithdrawalAmount;

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setRequestedUSDT("");
  };

  const handleWithdraw = async () => {
    if (isInsufficientBalance || isBelowMinWithdrawal || isInvalidRemaining) {
      let message = "Please check your withdrawal details";
      if (isInsufficientBalance) message = "Insufficient balance";
      if (isBelowMinWithdrawal)
        message = `Minimum withdrawal amount is ${minUSDTWithdrawalAmount} USDT`;
      if (isInvalidRemaining)
        message =
          "Your balance is too low for next withdrawal. Please withdraw the full balance or a minimum amount for next withdrawal.";

      showApiToast({
        response: { success: false, message } as any,
        title: "Validation Error",
      });
      return;
    }

    if (!destinationWallet || destinationWallet === "-") {
      showApiToast({
        response: {
          success: false,
          message: "Please set a default wallet address first",
        } as any,
        title: "Error",
      });
      return;
    }

    if (requestedAmount <= 0) {
      showApiToast({
        response: {
          success: false,
          message: "Please enter a valid amount",
        } as any,
        title: "Error",
      });
      return;
    }

    const res = await createWithdrawalRequest({
      userStakingPackageId: data.id,
      address: destinationWallet,
      amount: requestedAmount,
      currency: "usdtbsc",
    }).unwrap();

    showApiToast({
      response: res,
      title: "Success",
      description: "Withdrawal request submitted successfully",
      errorTitle: "Failed",
    });

    if (res?.success) {
      handleClose();
    }
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        disabled={!data.isBonusDone}
        size="sm"
        className="bg-primary/20 hover:bg-primary/30 text-primary border border-primary/50 transition-all duration-300"
      >
        Withdraw
      </Button>

      <CustomDialog
        open={open}
        onClose={handleClose}
        title="Withdrawal Breakdown"
        className="sm:max-w-[550px] bg-[#0A0A0A] border-primary/20"
        hideConfirmBtn
        hideCancelBtn
        customButtons={
          <div className="flex w-full flex-col gap-2 p-2">
            {isInsufficientBalance && (
              <p className="text-red-500 text-sm font-medium animate-pulse text-center">
                Insufficient balance for this withdrawal amount.
              </p>
            )}
            {isBelowMinWithdrawal && (
              <p className="text-amber-500 text-sm font-medium text-center italic">
                {`Minimum withdrawal amount is ${minUSDTWithdrawalAmount} USDT.`}
              </p>
            )}
            {isInvalidRemaining && (
              <p className="text-amber-500 text-sm font-medium text-center italic">
                Your remaining balance is insufficient for the next withdrawal.
                Please withdraw the full balance or leave a minimum of{" "}
                {minUSDTWithdrawalAmount} USDT in your account for your next
                withdrawal.
              </p>
            )}
            <div className="flex w-full gap-4">
              <Button
                variant="outline"
                className="flex-1 border-primary/20 text-default-200 hover:bg-primary/5 h-12"
                onClick={handleClose}
              >
                Cancel
              </Button>
              <SubmitButton
                className="flex-1 bg-primary hover:bg-primary/80 text-white font-semibold h-12 shadow-lg shadow-primary/20"
                isLoading={isSubmitting}
                onClick={handleWithdraw}
                disabled={isInsufficientBalance}
              >
                Withdraw Now
              </SubmitButton>
            </div>
          </div>
        }
      >
        <div className="space-y-4 py-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="number"
            label="Requested USDT"
            labelClassName="text-md"
            placeholder="0.00"
            value={requestedUSDT}
            onChange={(e) => setRequestedUSDT(e.target.value)}
            className="!h-11 bg-primary/5 border-primary/20 focus:border-primary/50 text-default-100 "
          />

          <Input
            readOnly
            label="Platform/Transaction fee (USDT)"
            labelClassName="text-md"
            value={`${platformWithdrawalFeePercentage.toFixed(2)} %`}
            className="!h-11 bg-border/5 border-border/10 text-default-200 cursor-not-allowed"
          />

          <Input
            readOnly
            label="Net USDT receivable"
            labelClassName="text-md"
            value={netReceivable.toFixed(2)}
            className="!h-11 bg-border/5 border-border/10 text-primary font-bold cursor-not-allowed"
          />

          <Input
            readOnly
            label="TOIN to be deducted"
            labelClassName="text-md"
            value={
              toinToDeduct > 0 && toinToDeduct < 0.01
                ? toinToDeduct.toFixed(6)
                : toinToDeduct.toFixed(2)
            }
            className="!h-11 bg-border/5 border-border/10 text-default-200 cursor-not-allowed"
          />

          <Input
            readOnly
            label="Remaining USDT"
            labelClassName="text-md"
            value={remainingUSDT.toFixed(2)}
            className="!h-11 bg-border/5 border-border/10 text-default-200 cursor-not-allowed"
          />

          <Input
            readOnly
            label="Destination Wallet"
            labelClassName="text-md"
            value={destinationWallet}
            className="!h-11 bg-border/5 border-border/10 text-default-200 cursor-not-allowed"
          />
        </div>
      </CustomDialog>
    </>
  );
};

export default WithdrawalModal;
