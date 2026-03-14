import { Decimal } from "@prisma/client/runtime/library";

export class DashboardAirDropEventResponseDto {
    id: string;
    eventName: string;
    toinAmount: Decimal;
    usedAmount: Decimal;
    usdConversionRate: Decimal;
    eventStartDate: string;
    eventEndDate: string;
    isActive: Boolean;
    createdAt: string;
}