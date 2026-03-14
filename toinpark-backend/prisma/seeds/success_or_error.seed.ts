import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

export async function seedSuccessOrError(prisma: PrismaClient) {

  console.log('Seeding database...');

  await prisma.successOrErrorOrSmsOrEmailText.createMany({
    data: [
      {
        messageCode: 4005,
        successOrErrorMessage: "Referral Link Send Successful.",
        smsMessage: null,
        emailMessage: `Dear Sir/Concern,

                        Referral Email Link : @emailLink 
                        Name : @fullName
                        Email : @email

                        more text.....`,
        messageType: "SUCCESS",
        isActive: true,
        createdAt: new Date().toISOString(),
        createdBy: "system",
        updatedAt: new Date().toISOString(),
        updatedBy: "system",
        statusCode: 400,
        subject_name: "Referral"
      },
      
      {
        messageCode: 4002,
        successOrErrorMessage: "Referral Email Send Successful.",
        smsMessage: null,
        emailMessage: `Dear Sir/Concern,

                        Referral Email Link : @emailLink 
                        Name : @fullName
                        Email : @email

                        more text.....`,
        messageType: "SUCCESS",
        isActive: true,
        createdAt: new Date().toISOString(),
        createdBy: "system",
        updatedAt: new Date().toISOString(),
        updatedBy: "system",
        statusCode: 400,
        subject_name: "Referral"
      },
      
      
    ]
  });

  console.log("Message Seed Completed!");
}  




