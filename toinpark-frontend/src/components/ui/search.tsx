import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, type FormHTMLAttributes } from "react";
import { useForm, useWatch, type Resolver } from "react-hook-form";
import * as Yup from "yup";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import SearchIcon from "../svg/SearchIcon";
import CrossIcon from "../svg/CrossIcon";

export const SearchSchema = Yup.object({
  search: Yup.string().notRequired(),
});

export type TSearch = {
  search?: string | undefined;
};

type SearchProps = {
  className?: string;
  placeholderText?: string;
  setSearchTerm: (value: string) => void;
};

function Search({
  className,
  placeholderText = "Search",
  setSearchTerm,
  ...rest
}: SearchProps & FormHTMLAttributes<HTMLFormElement>) {
  const form = useForm<TSearch>({
    resolver: yupResolver(SearchSchema) as Resolver<TSearch>,
  });

  const { control, reset, handleSubmit } = form;

  const search = useWatch({ control, name: "search" });

  const onSearch = useCallback(
    (search: TSearch) => {
      if (search?.search) {
        return setSearchTerm(search?.search);
      }
    },
    [setSearchTerm]
  );

  const clear = useCallback(() => {
    reset({ search: "" });
    setSearchTerm("");
  }, [reset, setSearchTerm]);

  return (
    <div className={cn("relative w-full", className)}>
      <form {...rest} onSubmit={handleSubmit(onSearch)}>
        <Input
          placeholder={placeholderText}
          type="search"
          leftContent={<SearchIcon className="size-5 text-lg text-gray-500" />}
          rightContent={
            search ? (
              <CrossIcon
                className="size-5 cursor-pointer transition-colors duration-300 hover:text-red-500"
                onClick={clear}
              />
            ) : (
              ""
            )
          }
          {...form.register("search")}
        />
      </form>
    </div>
  );
}

export default Search;
