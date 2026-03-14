"use client";
import { forwardRef, useCallback } from "react";
import { useBooleanContext } from "@/contexts/BooleanContext";
import useMeasure from "@/hooks/useMeasure";
import { cn } from "@/lib/utils";
import type { IOption } from "./DropDown/Option";
import Placeholder from "./Placeholder";
import Search from "./Search";
import { useSelectInputContext } from "./SelectInputContext";
import Value from "./Value";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "../ui/button";

const handleStopPropagation = <T,>(e: React.MouseEvent<T>) => {
  e.stopPropagation();
};

type THandleClick = (props: {
  toggle: () => void;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) => React.MouseEventHandler<HTMLButtonElement>;

export type TButton = Omit<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >,
  "color" | "rounded" | "size"
>;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ITriggerProps extends TButton {}

function TriggerComponent<T extends IOption>(
  { className, type = "button", children, ...restProps }: ITriggerProps,
  ref?: React.ForwardedRef<HTMLButtonElement>
) {
  const { isOpen, toggle } = useBooleanContext();
  const {
    leftContent,
    leftContentClassName,
    rightContent,
    rightContentClassName,
    searchLocation,
    enableRotateDropdownIcon,
    toggleElement: ToggleElement = ChevronDownIcon,
    toggleElementClassName,
    onBlur,
    disabled,
    readOnly,
  } = useSelectInputContext<T>();
  const { ref: leftContentRef, dimensions: leftContentDimensions } =
    useMeasure();
  const { ref: rightContentRef, dimensions: rightContentDimensions } =
    useMeasure();

  const rightFinalContent = rightContent ? (
    rightContent
  ) : (
    <ToggleElement
      className={cn(
        "size-5 shrink-0 cursor-pointer text-default-600 transition-all duration-100 ease-linear",
        toggleElementClassName,
        enableRotateDropdownIcon && isOpen ? "rotate-180" : ""
      )}
      onClick={toggle}
    />
  );

  const handleClick: THandleClick = useCallback(
    ({ toggle, onClick }) =>
      (e) => {
        onClick?.(e);
        toggle();
      },
    []
  );

  return (
    <Button
      {...restProps}
      ref={ref}
      onClick={handleClick({ toggle, onClick: restProps.onClick })}
      onBlur={!isOpen ? onBlur : undefined}
      type={type}
      className={cn(
        "border text-default-200 !h-12 data-[placeholder]:text-default-200 [&_svg:not([class*='text-default-200'])]:text-muted-foreground cursor-pointer focus-visible:border-ring/60 focus-visible:ring-primary/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-sm  bg-muted hover:bg-muted text-lg  px-6 py-2 whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none  disabled:cursor-not-allowed disabled:opacity-50 !data-[size=default]:h-16 !data-[size=sm]:h-12 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 ",
        isOpen
          ? "border-primary ring-1 ring-primary ring-opacity-20"
          : "focus:border-primary focus:ring-1",
        readOnly ? "pointer-events-none bg-default-100" : "",
        className
      )}
      disabled={disabled}
    >
      <span
        className={cn("block h-full w-full")}
        style={{
          paddingLeft: `${leftContentDimensions?.width}px`,
          paddingRight: `${rightContentDimensions?.width}px`,
        }}
      >
        {!!leftContent && (
          <span
            className={cn(
              "left-0 text-default-600",
              "absolute bottom-0 top-0 inline-flex h-full w-fit shrink-0 select-none items-center justify-center pl-4",
              leftContentClassName
            )}
            ref={leftContentRef}
            onClick={handleStopPropagation}
            onPointerDown={handleStopPropagation}
            onDoubleClick={handleStopPropagation}
            onChange={handleStopPropagation}
          >
            {leftContent}
          </span>
        )}
        <Placeholder<T> />
        {<Value<T> />}
        {searchLocation === "inside-trigger" && isOpen && <Search<T> />}

        {!!rightFinalContent && (
          <span
            className={cn(
              "right-0 text-default-900",
              "absolute bottom-0 top-0 inline-flex h-full w-fit shrink-0 select-none items-center justify-center pr-4",
              rightContentClassName
            )}
            ref={rightContentRef}
            onClick={handleStopPropagation}
            onPointerDown={handleStopPropagation}
            onDoubleClick={handleStopPropagation}
            onChange={handleStopPropagation}
          >
            {rightFinalContent}
          </span>
        )}
      </span>
    </Button>
  );
}

const Trigger = forwardRef(TriggerComponent) as <T extends IOption>(
  props: ITriggerProps & { ref?: React.Ref<HTMLButtonElement> }
) => React.ReactElement;

export default Trigger;
