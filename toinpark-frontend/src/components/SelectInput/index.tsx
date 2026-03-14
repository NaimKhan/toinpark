"use client";
import BooleanContextProvider from "@/contexts/BooleanContext";
import LabelErrorWrapper, {
  type ILabelErrorWrapperProps,
} from "@/components/ui/LabelErrorWrapper";

import DropDown from "./DropDown";
import type { IOption } from "./DropDown/Option";
import { SelectInputProvider } from "./SelectInputContext";
import Trigger from "./Trigger";

export type TSelectInput<T extends IOption> = {
  options?: T[];
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onChange?: (value: T | undefined) => void;
  value?: T | string | number | null;
  customSelectedValue?: React.ReactNode | null;
  labelKey?: keyof T;
  valueKey?: keyof T;
  className?: string;
  placeholder?: React.ReactNode;
  onBlur?: React.FocusEventHandler<HTMLButtonElement>;
  readOnly?: boolean;
  disabled?: boolean;
  selectedValueContent?: React.ReactNode;
  isLoading?: boolean;
  loadingContent?: React.ReactNode;
  leftContent?: React.ReactNode;
  leftContentClassName?: string;
  rightContent?: React.ReactNode;
  rightContentClassName?: string;
  toggleElement?: React.ElementType;
  toggleElementClassName?: string;
  hideSelectedIcon?: boolean;
  selectedIcon?: React.ReactNode;
  dropDownIconContent?: React.ReactNode;
  hideDropDownIcon?: boolean;
  rotateInternalDDIcon?: boolean;
  searchLocation?: "off" | "inside-trigger" | "inside-dropdown";
  dropdownContainerClassName?: string;
  optionClassName?: string;
  dropDownTopContent?: React.ReactNode;
  dropDownBottomContent?: React.ReactNode;
  enableRotateDropdownIcon?: boolean;
  enableOptionRightIcon?: boolean;
  optionRightIconColor?: "primary" | "success";
  searchMode?: "local" | "server";
  onServerSearch?: (search: string | undefined) => void;
} & (Omit<ILabelErrorWrapperProps, "className"> & {
  labelErrorContainerClassName?: string;
});

function SelectInput<T extends IOption>(props: TSelectInput<T>) {
  const labelErrorWrapperProps: ILabelErrorWrapperProps = {
    label: props?.label,
    error: props?.error,
    labelClassName: props?.labelClassName,
    required: props?.required,
  };

  return (
    <BooleanContextProvider>
      <LabelErrorWrapper {...labelErrorWrapperProps}>
        <SelectInputProvider<T> {...props}>
          <Trigger<T> className={props?.className} />

          <DropDown<T> />
        </SelectInputProvider>
      </LabelErrorWrapper>
    </BooleanContextProvider>
  );
}

export default SelectInput;
