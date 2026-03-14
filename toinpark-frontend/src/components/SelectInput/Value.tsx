import { forwardRef } from "react";

import { useBooleanContext } from "@/contexts/BooleanContext";

import type { IOption } from "./DropDown/Option";
import { useSelectInputContext } from "./SelectInputContext";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IValueProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {}

function ValueComponent<_T extends IOption>(
  _props: IValueProps,
  _ref?: React.Ref<HTMLDivElement>
) {
  const { isOpen } = useBooleanContext();
  const { value, searchLocation, options, customSelectedValue } =
    useSelectInputContext<_T>();

  if (
    value === null ||
    value === undefined ||
    (searchLocation === "inside-trigger" && isOpen)
  ) {
    return null;
  }

  let valueContent: React.ReactNode = null;
  if (customSelectedValue) {
    valueContent = customSelectedValue;
  }
  if (typeof value === "object" && !Array.isArray(value)) {
    valueContent = value?.label;
  } else if (typeof value === "string" || typeof value === "number") {
    const option = options?.find((option) => option.value === value);
    valueContent = option?.label;
  }

  return (
    <span className="line-clamp-1 overflow-hidden text-ellipsis text-left text-base font-normal leading-6 text-default-900">
      {valueContent}
    </span>
  );
}

const Value = forwardRef(ValueComponent) as <_T extends IOption>(
  props: IValueProps & { ref?: React.Ref<HTMLDivElement> }
) => React.ReactElement;

export default Value;
