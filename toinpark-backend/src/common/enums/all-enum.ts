export enum TicketStatus {
  OPEN,
  RESOLVED,
  CLOSED
}

export enum TicketPriority {
  LOW,
  MEDIUM,
  HIGH,
  URGENT
}


export enum Gender {
  MALE,
  FEMALE,
  OTHER,
  PREFER_NOT_TO_SAY
}

export enum OtpFor {
  VerifiedRegistrationPhoneOrEmail,
  VerifiedProfilePhoneOrEmail,
  ChangePassword,
  ForgetPassword,
}

export enum AudienceType {
  MEMBER,
  SYSTEM_USER
}
