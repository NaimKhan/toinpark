"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  communityEventSchema,
  TCommunityEventFormData,
} from "./communityEventSchema";

export function useCommunityEventForm(
  defaultValues?: Partial<TCommunityEventFormData>,
) {
  const safeDefaults: TCommunityEventFormData = {
    title: defaultValues?.title ?? "",
    eventType: defaultValues?.eventType ?? "CONFERENCE",
    bannerImage: defaultValues?.bannerImage ?? undefined,
    eventLink: defaultValues?.eventLink ?? "",
    eventDate: defaultValues?.eventDate ?? "",
    mapLink: defaultValues?.mapLink ?? "",
    description: defaultValues?.description ?? "",
    eventLocation: defaultValues?.eventLocation ?? "",
  };

  return useForm<TCommunityEventFormData>({
    resolver: zodResolver(communityEventSchema),
    defaultValues: safeDefaults,
  });
}
