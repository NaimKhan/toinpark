export interface IAllPackageTableData {
  serialNo: number;
  packageName: string;
  minimumAmount: number;
  maximumAmount: number;
  dailyProfit: number;
  edit: string;
}
export const data: IAllPackageTableData[] = [
  {
    serialNo: 1,
    packageName: "Bronze (Free)",
    minimumAmount: 5,
    maximumAmount: 5,
    dailyProfit: 0.15,
    edit: "Edit",
  },
];
