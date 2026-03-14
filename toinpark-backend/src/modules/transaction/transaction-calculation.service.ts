import { Injectable } from '@nestjs/common';
import { TransactionType } from '@prisma/client';

export enum AmountTypeEnum {
  DEBIT = 'Debit',
  CREDIT = 'Credit',
}

export const TRANSACTION_TYPE_AMOUNT_MAP = new Map<TransactionType, AmountTypeEnum>([
  // Credit transactions
  [TransactionType.STAKE, AmountTypeEnum.CREDIT],
  [TransactionType.COMMISSION_BONUS, AmountTypeEnum.CREDIT],
  [TransactionType.PROFIT, AmountTypeEnum.CREDIT],
  [TransactionType.STAKING_BONUS, AmountTypeEnum.CREDIT],
  [TransactionType.ENTRY_BONUS, AmountTypeEnum.CREDIT],
  [TransactionType.KYC_BONUS, AmountTypeEnum.CREDIT],
  [TransactionType.CHALLENGE_BONUS, AmountTypeEnum.CREDIT],
  [TransactionType.LEVELING_BONUS, AmountTypeEnum.CREDIT],
  [TransactionType.SOCIAL_REFERRAL, AmountTypeEnum.CREDIT],
  [TransactionType.CLAIM_BONUS, AmountTypeEnum.CREDIT],

  // Debit transactions
  [TransactionType.REFUND, AmountTypeEnum.DEBIT],
  [TransactionType.WITHDRAWAL, AmountTypeEnum.DEBIT],
  [TransactionType.VOID, AmountTypeEnum.DEBIT],
]);

export interface TransactionWithBalance {
  id: string;
  trxType?: TransactionType;
  toinAmount: any; // Decimal from Prisma
  usdtAmount: any; // Decimal from Prisma
  createdAt?: any;
  amountType: AmountTypeEnum;
  toinBalanceAmount: number;
  usdtBalanceAmount: number;
  [key: string]: any; // Allow other fields
}

@Injectable()
export class TransactionCalculationService {
  /**
   * Get amount type (CREDIT/DEBIT) for a transaction type
   */
  getAmountType(trxType: TransactionType | null | undefined): AmountTypeEnum {
    if (!trxType) return AmountTypeEnum.DEBIT;
    return TRANSACTION_TYPE_AMOUNT_MAP.get(trxType) || AmountTypeEnum.DEBIT;
  }

  /**
   * Calculate running balances for a list of transactions
   * Transactions will be sorted by createdAt ASC for correct balance calculation
   * 
   * @param transactions - Array of transactions
   * @param initialToinBalance - Starting toin balance (default: 0)
   * @param initialUsdtBalance - Starting usdt balance (default: 0)
   * @returns Transactions with amountType, toinBalanceAmount, and usdtBalanceAmount (sorted ASC)
   */
  calculateRunningBalances<T extends { trxType?: TransactionType; toinAmount: any; usdtAmount: any; createdAt?: any }>(
    transactions: T[],
    initialToinBalance: number = 0,
    initialUsdtBalance: number = 0,
  ): (T & { amountType: AmountTypeEnum; toinBalanceAmount: number; usdtBalanceAmount: number })[] {
    // Sort by createdAt ASC to ensure correct chronological calculation
    const sortedTransactions = [...transactions].sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateA - dateB;
    });

    let toinBalance = initialToinBalance;
    let usdtBalance = initialUsdtBalance;

    return sortedTransactions.map((transaction) => {
      const amountType = this.getAmountType(transaction.trxType);
      const toinAmount = Number(transaction.toinAmount) || 0;
      const usdtAmount = Number(transaction.usdtAmount) || 0;

      if (amountType === AmountTypeEnum.CREDIT) {
        toinBalance += toinAmount;
        usdtBalance += usdtAmount;
      } else {
        toinBalance -= toinAmount;
        usdtBalance -= usdtAmount;
      }

      return {
        ...transaction,
        amountType,
        toinBalanceAmount: Number(toinBalance.toFixed(2)),
        usdtBalanceAmount: Number(usdtBalance.toFixed(2)),
      };
    });
  }

  /**
   * Calculate running balances and return in DESC order (newest first)
   * Use this for displaying transactions with proper ledger balances
   * 
   * @param transactions - Array of transactions (any order)
   * @param initialToinBalance - Starting toin balance (default: 0)
   * @param initialUsdtBalance - Starting usdt balance (default: 0)
   */
  calculateRunningBalancesDesc<T extends { trxType?: TransactionType; toinAmount: any; usdtAmount: any; createdAt?: any }>(
    transactions: T[],
    initialToinBalance: number = 0,
    initialUsdtBalance: number = 0,
  ): (T & { amountType: AmountTypeEnum; toinBalanceAmount: number; usdtBalanceAmount: number })[] {
    // Calculate in ASC order, then reverse for DESC display
    const calculated = this.calculateRunningBalances(transactions, initialToinBalance, initialUsdtBalance);
    return calculated.reverse();
  }

  /**
   * Add amountType to transactions without calculating running balance
   * Use this when you only need the CREDIT/DEBIT indicator
   */
  addAmountType<T extends { trxType?: TransactionType; createdAt?: any }>(
    transactions: T[],
  ): (T & { amountType: AmountTypeEnum })[] {
    return transactions.map((transaction) => ({
      ...transaction,
      amountType: this.getAmountType(transaction.trxType),
    }));
  }

  /**
   * Calculate total credits and debits from transactions
   */
  calculateTotals(transactions: { trxType?: TransactionType; toinAmount: any; usdtAmount: any; createdAt?: any }[]): {
    totalToinCredit: number;
    totalToinDebit: number;
    totalUsdtCredit: number;
    totalUsdtDebit: number;
    netToinBalance: number;
    netUsdtBalance: number;
  } {
    let totalToinCredit = 0;
    let totalToinDebit = 0;
    let totalUsdtCredit = 0;
    let totalUsdtDebit = 0;

    transactions.forEach((transaction) => {
      const amountType = this.getAmountType(transaction.trxType);
      const toinAmount = Number(transaction.toinAmount) || 0;
      const usdtAmount = Number(transaction.usdtAmount) || 0;

      if (amountType === AmountTypeEnum.CREDIT) {
        totalToinCredit += toinAmount;
        totalUsdtCredit += usdtAmount;
      } else {
        totalToinDebit += toinAmount;
        totalUsdtDebit += usdtAmount;
      }
    });

    return {
      totalToinCredit: Number(totalToinCredit.toFixed(2)),
      totalToinDebit: Number(totalToinDebit.toFixed(2)),
      totalUsdtCredit: Number(totalUsdtCredit.toFixed(2)),
      totalUsdtDebit: Number(totalUsdtDebit.toFixed(2)),
      netToinBalance: Number((totalToinCredit - totalToinDebit).toFixed(2)),
      netUsdtBalance: Number((totalUsdtCredit - totalUsdtDebit).toFixed(2)),
    };
  }
}