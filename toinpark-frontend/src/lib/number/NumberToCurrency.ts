export default function FormattedBalance(balance: number): string {
  return new Intl.NumberFormat("en-US").format(balance);
}
