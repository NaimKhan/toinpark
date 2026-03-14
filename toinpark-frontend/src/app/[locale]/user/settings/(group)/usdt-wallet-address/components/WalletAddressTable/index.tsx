"use client";

import DefaultTable from "@/components/feature/table/DefaultTable";
import { columns } from "./columns";
import DropDownMenu from "@/components/feature/table/DropDownMenu";
import SearchComponent from "@/components/ui/SearchComponent";
import BasicPagination from "@/components/pagination/basic-pagination";

import { useGetUserWalletAddressesQuery } from "@/store/api/user-wallet-address/user-wallet-address-api";
import { TGetAllWalletAddressesArgs } from "@/store/api/user-wallet-address/user-wallet-address.types";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import RenderData from "@/components/feature/loader/RenderData";

function WalletAddressTable() {
  const { getAllParamValue } =
    useManageSearchParams<Exclude<TGetAllWalletAddressesArgs, void>>();
  const { limit = 10, page } = getAllParamValue();

  const { data: walletAddressRes, ...getWalletAddressApiState } =
    useGetUserWalletAddressesQuery({ limit, page });

  const walletAddressData = walletAddressRes?.data?.items;
  const walletAddressPagination = walletAddressRes?.data?.meta;

  return (
    <DefaultTable
      data={walletAddressData}
      columns={columns}
      className="text-default-100 border-none"
    >
      <DefaultTable.TitleContainer>
        <div className="flex flex-wrap justify-between gap-4 items-center w-full">
          <div className="flex-1">
            <DropDownMenu />
          </div>
        </div>
      </DefaultTable.TitleContainer>
      <RenderData
        expectedDataType="array"
        data={walletAddressData}
        {...getWalletAddressApiState}
      >
        <DefaultTable.Table />
        <DefaultTable.Footer>
          <BasicPagination
            isLoading={
              getWalletAddressApiState.isLoading ||
              getWalletAddressApiState?.isFetching
            }
            totalPages={walletAddressPagination?.totalPages}
            hasNext={walletAddressPagination?.hasNext}
            hasPrevious={walletAddressPagination?.hasPrevious}
          />
        </DefaultTable.Footer>
      </RenderData>
    </DefaultTable>
  );
}

export default WalletAddressTable;
