"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { openTicketSchema, TOpenTicketSchema } from "./openTicketSchema";

import { Input } from "@/components/ui/input";
import LabelErrorWrapper from "@/components/ui/LabelErrorWrapper";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import SubmitButton from "@/components/feature/buttons/SubmitButton";
import { useCreateATicketMutation } from "@/store/api/tickets/tickets-api";
import { useToast } from "@/components/ui/use-toast";
import { TCreateTicket } from "@/store/api/tickets/tickets.types";
import RenderData from "@/components/feature/loader/RenderData";
import { TGetTicketsCategoriesData } from "@/store/api/tickets-categories/tickets-categories.types";
import { useGetActiveTicketsCategoriesQuery } from "@/store/api/tickets-categories/tickets-categories-api";
import { useRouter } from "next/navigation";
import InputLoader from "@/components/feature/loader/InputLoader";
import SelectDataNotFound from "@/components/dataNotFound/SelectDataNotFound";
import { getApiMessage, getFieldErrors } from "@/lib/errors/getFieldErrors";
import { applyFieldErrors } from "@/lib/errors/applyFieldErrors";
import useDefaultLocale from "@/hooks/useDefaultLocale";

function OpenTicketForm() {
  const router = useRouter();
  const { toast } = useToast();
  const locale = useDefaultLocale();
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
    reset,
  } = useForm<TOpenTicketSchema>({
    resolver: zodResolver(openTicketSchema),
  });

  const { data: TicketsCategoriesRes, ...getTicketsCategoriesApiState } =
    useGetActiveTicketsCategoriesQuery();
  const TicketsCategoriesData = TicketsCategoriesRes?.data;

  const [createATicket, { isLoading }] = useCreateATicketMutation();

  const onSubmit = async (data: TOpenTicketSchema) => {
    const toastId = toast({
      variant: "loading",
      title: "Loading...",
      description: "Please wait while we apply your changes.",
    });
    try {
      const res = await createATicket(data as TCreateTicket).unwrap();
      const ticketId = res?.data?.id;

      toastId.update({
        id: toastId.id,
        variant: "success",
        title: "Success",
        description: "Ticket has been created successfully.",
      });

      reset();
      if (ticketId) {
        router.replace(
          `/${locale}/user/help-and-support/tickets/chat?ticketId=${ticketId}`
        );
      } else {
        router.replace(`/${locale}/user/help-and-support/tickets`);
      }
    } catch (error) {
      const fieldErrors = getFieldErrors(error);
      applyFieldErrors(fieldErrors, setError);

      toastId.update({
        id: toastId.id,
        variant: "error",
        title: "Error",
        description: getApiMessage(error) || "Something went wrong",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-[606px] space-y-6 md:space-y-10"
    >
      <div className="space-y-4">
        <RenderData
          expectedDataType="array"
          data={TicketsCategoriesData}
          showEmptyState={true}
          {...getTicketsCategoriesApiState}
          loadingSkeleton={<InputLoader />}
          dataNotFoundUI={
            <SelectDataNotFound placeholder="No category found" />
          }
        >
          <LabelErrorWrapper
            label="Category"
            error={errors.ticketCategoryId?.message && "Select a category"}
            errorClassName="text-md"
          >
            <Select
              onValueChange={(value) => setValue("ticketCategoryId", value)}
            >
              <SelectTrigger
                error={errors.ticketCategoryId?.message}
                className="w-full "
              >
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>

              <SelectContent className="max-w-[606px]">
                {TicketsCategoriesData?.map(
                  (cat: TGetTicketsCategoriesData) => (
                    <SelectItem key={cat.id} value={String(cat.id)}>
                      {cat.name}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </LabelErrorWrapper>
        </RenderData>

        <Input
          placeholder="Subject"
          className="w-full"
          {...register("subject")}
          error={errors.subject?.message}
          errorClassName="text-md"
        />

        <Textarea
          placeholder="Describe your issue in detail"
          className="w-full"
          {...register("description")}
          error={errors.description?.message}
          errorClassName="text-md"
        />
      </div>

      <SubmitButton
        disabled={!TicketsCategoriesData}
        className="w-full font-medium"
        isLoading={isLoading}
      >
        Submit
      </SubmitButton>
    </form>
  );
}

export default OpenTicketForm;
