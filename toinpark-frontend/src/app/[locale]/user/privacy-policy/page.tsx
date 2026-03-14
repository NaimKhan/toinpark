"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function PrivacyPolicyPage() {
  return (
    <div className="px-6 py-8 xl:px-16 md:px-12 md:py-12 w-full max-w-7xl">
      <Card className="bg-transparent border-none shadow-none p-0">
        <CardHeader className="p-0 pb-8">
          <CardTitle className="text-3xl md:text-4xl font-bold text-left bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            Privacy Policy
          </CardTitle>
          <p className="text-left text-muted-foreground mt-2">
            Effective Date: January 19, 2026
          </p>
        </CardHeader>
        <CardContent className="p-0 space-y-8 text-default-200 dark:text-default-100">
          <div className="p-4 bg-muted/30 rounded-lg text-muted-foreground/80">
            <p className="font-medium text-left">
              At TOI Community, owned by TOI DLT Foundation, we believe in data
              sovereignty and transparency. This Privacy Policy explains how we
              handle the limited information we collect and our commitment to
              keeping your digital identity secure within the Abu Dhabi Global
              Market (ADGM) regulatory framework.
            </p>
          </div>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">
              1. Information We Collect
            </h2>
            <p className="leading-relaxed">
              We adhere to a &quot;Data Minimization&quot; principle. We only
              collect the following data points to facilitate secure access to
              our Web3 ecosystem:
            </p>
            <ul className="list-disc pl-6 space-y-2 marker:text-primary">
              <li>
                <strong>Email Address:</strong> Used for account identification
                and sending authentication codes.
              </li>
              <li>
                <strong>Mobile Number:</strong> Used exclusively for sending
                One-Time Passwords (OTP) via SMS to verify your identity.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">
              2. How We Use Your Data
            </h2>
            <p className="leading-relaxed">
              Your data is used strictly for Authentication and Security.
            </p>
            <ul className="list-disc pl-6 space-y-2 marker:text-primary">
              <li>To verify your identity during login.</li>
              <li>
                To prevent unauthorized access to your staked TOIN and rewards.
              </li>
              <li>
                To communicate essential platform updates or security alerts.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">
              3. Data Ownership and Protection
            </h2>
            <ul className="list-disc pl-6 space-y-2 marker:text-primary">
              <li>
                <strong>Ownership:</strong> TOI DLT Foundation is the primary
                owner and custodian of the user data.
              </li>
              <li>
                <strong>Encryption:</strong> All sensitive data is encrypted at
                rest and in transit. We use enterprise-grade security protocols
                to ensure your contact information is shielded from unauthorized
                access.
              </li>
              <li>
                <strong>No Profiling:</strong> We do not track your browsing
                habits or create behavioral profiles for advertising.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">
              4. Third-Party Sharing
            </h2>
            <p className="leading-relaxed">
              We maintain a strict no-sale policy regarding user data. We only
              share your data with trusted third-party service providers under
              the following conditions:
            </p>
            <ul className="list-disc pl-6 space-y-2 marker:text-primary">
              <li>
                <strong>Service Fulfillment:</strong> Sharing your mobile number
                with SMS gateway providers or your email with mail servers
                solely to deliver your OTP.
              </li>
              <li>
                <strong>Legal Compliance:</strong> If required by ADGM law or
                valid legal processes.
              </li>
            </ul>
            <p className="leading-relaxed">
              Our service providers are contractually obligated to protect your
              data and are prohibited from using it for any other purpose.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">
              5. Web3 and Blockchain Transparency
            </h2>
            <p className="leading-relaxed">
              Please note that while your personal contact info (Email/Mobile)
              is kept private on our secured servers, any transactions involving
              TOIN staking or reward distribution occur on a public blockchain.
              These transactions are linked to your Wallet Address, not your
              personal identity, but are permanent and public by nature.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">
              6. Your Rights
            </h2>
            <p className="leading-relaxed">
              Under ADGM Data Protection Regulations, you have the right to:
            </p>
            <ul className="list-disc pl-6 space-y-2 marker:text-primary">
              <li>Access the data we hold about you.</li>
              <li>Request the deletion of your account and associated data.</li>
              <li>
                Withdraw consent for mobile/email communications (though this
                may prevent access to the platform).
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">
              7. Contact Us
            </h2>
            <p className="leading-relaxed">
              For any privacy-related inquiries or to exercise your data rights,
              please contact the TOI DLT Foundation compliance team through the
              official TOI Community support channels.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">
              Key Highlights for Your Users
            </h2>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Feature</TableHead>
                    <TableHead>Policy</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Personal Data</TableCell>
                    <TableCell>Email & Mobile Number Only</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      Third-Party Sales
                    </TableCell>
                    <TableCell>Never</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Security</TableCell>
                    <TableCell>Full Encryption</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Jurisdiction</TableCell>
                    <TableCell>ADGM, UAE</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </section>
        </CardContent>
      </Card>
      <div className="mt-8 mb-4 text-left text-sm text-muted-foreground/60">
        <p>
          &copy; {new Date().getFullYear()} TOI DLT Foundation. All rights
          reserved.
        </p>
      </div>
    </div>
  );
}
