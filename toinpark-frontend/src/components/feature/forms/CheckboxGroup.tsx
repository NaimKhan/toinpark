"use client";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

interface CheckboxItem {
  id: string;
  label: string;
}

interface CheckboxGroupProps {
  title: string;
  items: CheckboxItem[];
  field: any;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  title,
  items,
  field,
}) => {
  const handleChange = (id: string, checked: boolean) => {
    field.onChange({
      ...field.value,
      [id]: checked,
    });
  };

  return (
    <Card className="mt-5 text-default-100">
      <CardTitle className="px-5 pt-5">{title}</CardTitle>
      <CardContent className="space-y-2 pb-5">
        {items.map((item) => (
          <Checkbox
            labelClassName="text-md font-normal w-fit"
            key={item.id}
            htmlFor={item.id}
            label={item.label}
            id={item.id}
            checked={!!field.value?.[item.id]}
            onCheckedChange={(checked) => handleChange(item.id, !!checked)}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default CheckboxGroup;
