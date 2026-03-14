"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";

type FormValues = {
  items: {
    name: string;
    email: string;
  }[];
};

const RepeatUpForm: React.FC = () => {
  const { register, control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      items: [{ name: "", email: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Submitted Data:", data);
    reset();
  };

  return (
    <div className="flex items-start justify-center text-default-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Level Commission Setting
        </h2>

        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex flex-col md:flex-row gap-4 items-center mb-4"
          >
            <Input
              {...register(`items.${index}.name` as const)}
              placeholder="Enter name"
              className="w-full h-12"
            />
            <Input
              {...register(`items.${index}.email` as const)}
              placeholder="Enter email"
              className="w-full h-12"
            />
            <Button type="button" onClick={() => remove(index)} className="px-8 py-3 !h-12 text-sm md:text-md font-light md:font-medium text-default-100 ">
              Remove
            </Button>
          </div>
        ))}

        <div className="flex justify-between mt-6">
          <Button
            type="button"
            onClick={() => append({ name: "", email: "" })}
            className="px-8 py-3 !h-12 text-sm md:text-md font-light md:font-medium text-default-100 "
          >
            + Add More
          </Button>
          <Button type="submit" className="px-8 py-3 !h-12 text-sm md:text-md font-light md:font-medium text-default-100 ">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RepeatUpForm;
