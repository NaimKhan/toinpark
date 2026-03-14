import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";

type Props = {
  placeholder?: string;
  className?: string;
};

export default function SelectDataNotFound({
  placeholder = "No data found",
  className = "w-full",
}: Props) {
  return (
    <Select disabled>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
    </Select>
  );
}
