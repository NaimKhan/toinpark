"use client";

import { useCallback } from "react";
import useDebounce from "@/hooks/useDebounce";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import { cn } from "@/lib/utils";
import type { TPaginationArgs } from "@/store/api/common-api-types";
import { Input } from "@/components/ui/input";
import SearchIcon from "../svg/SearchIcon";
import CrossIcon from "../svg/CrossIcon";

type TSearchComponentCommonProps = {
  placeholder?: string;
  searchIcon?: React.ReactElement;
  className?: string;
  type?:
    | "number"
    | "hidden"
    | "text"
    | "email"
    | "search"
    | "password"
    | "tel"
    | "url"
    | "file";
};

type UrlModeProps = {
  mode?: "url";
} & TSearchComponentCommonProps;

type ExternalModeProps = {
  mode: "external";
  search?: string;
  setSearch?: (value: string | undefined) => void;
} & TSearchComponentCommonProps;

type SearchComponentProps = UrlModeProps | ExternalModeProps;

export default function SearchComponent(props: SearchComponentProps) {
  const {
    placeholder = "Search",
    searchIcon,
    className,
    type = "search",
  } = props;

  const { updateMultipleParam, getAParamValue } =
    useManageSearchParams<Exclude<TPaginationArgs, void | undefined>>();
  const searchParam = getAParamValue("search");

  const { debounce, nonDebouncedValue } = useDebounce<string, undefined>({
    value: props.mode === "external" ? props.search : searchParam,
    delay: 700,
    debouncedFallbackValue: undefined,
    nonDebouncedValueFallback: "",
    debouncedFunction: (value) => {
      if (props.mode === "external") {
        props.setSearch?.(value);
        return;
      }
      updateMultipleParam({ search: value, page: undefined });
    },
  });

  const handleChange = useCallback(
    (setSearch?: (v: string | undefined) => void) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch?.(e.target.value);
      },

    []
  );

  const debouncedChange = handleChange(debounce());

  const clearSearch = () => {
    if (props.mode === "external") {
      props.setSearch?.("");
      return;
    }

    updateMultipleParam({
      search: undefined,
      page: undefined,
    });

    debouncedChange({
      target: { value: "" },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  const hasValue =
    props.mode === "external"
      ? Boolean(props.search)
      : Boolean(nonDebouncedValue);

  /*  const commonProps = {
    type,
    placeholder,
    className: cn(
      "search-input z-0 ps-10 text-base placeholder:text-default-500",
      className
    ),
    leftContent: searchIcon || (
      <SearchIcon className="size-4 h-full shrink-0 text-default-200" />
    ),
  }; */
  const commonProps = {
    type,
    placeholder,
    className: cn(
      "search-input z-0 ps-10 pe-10 text-base placeholder:text-default-500",
      className
    ),
    leftContent: searchIcon || (
      <SearchIcon className="size-4 h-full shrink-0 text-default-200" />
    ),
    rightContent: hasValue ? (
      <CrossIcon
        className="size-5 cursor-pointer text-default-400 transition-colors duration-200 hover:text-primary"
        onClick={clearSearch}
        aria-label="Clear search"
      />
    ) : null,
  };

  if (props.mode === "external") {
    return (
      <Input
        {...commonProps}
        value={props.search ?? ""}
        onChange={handleChange(props.setSearch)}
      />
    );
  }

  return (
    <Input
      {...commonProps}
      value={nonDebouncedValue ?? ""}
      //onChange={handleChange(debounce())}
      onChange={debouncedChange}
    />
  );
}
