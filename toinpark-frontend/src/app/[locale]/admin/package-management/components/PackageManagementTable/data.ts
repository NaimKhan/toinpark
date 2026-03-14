export interface IPackageManagementTableData {
  serialNo: number;
  packageName: string;
  minimumAmount: number;
  maximumAmount: number;
  dailyProfit: number;
  action: string;
}
export const data: IPackageManagementTableData[] = [
  {
    serialNo: 1,
    packageName: "Bronze (Free)",
    minimumAmount: 5,
    maximumAmount: 5,
    dailyProfit: 0.15,
    action: "Edit",
  },
];
