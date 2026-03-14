import { forwardRef } from "react";

import { useBooleanContext } from "@/contexts/BooleanContext";
import { cn } from "@/lib/utils";

import type { IOption } from "./DropDown/Option";
import { useSelectInputContext } from "./SelectInputContext";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IPlaceholderProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  > {}

function PlaceholderComponent<T extends IOption>(
  { className, ...restProps }: IPlaceholderProps,
  ref?: React.Ref<HTMLParagraphElement>,
) {
  const { isOpen } = useBooleanContext();
  const { value, placeholder, searchLocation } = useSelectInputContext<T>();

  if ((value !== null && value !== undefined && value !== "") || !placeholder) {
    return null;
  }

  if (
    (searchLocation === "inside-trigger" && !isOpen) ||
    searchLocation === "inside-dropdown" ||
    searchLocation === "off" ||
    searchLocation === undefined
  ) {
    return (
      <p
        {...restProps}
        className={cn(
          "line-clamp-1 overflow-hidden text-ellipsis text-start text-base font-normal leading-6 text-default-200",
          className,
        )}
      >
        {placeholder}
      </p>
    );
  }

  return null;
}

const Placeholder = forwardRef(PlaceholderComponent) as <T extends IOption>(
  props: IPlaceholderProps & { ref?: React.Ref<HTMLDivElement> },
) => React.ReactElement;

export default Placeholder;
