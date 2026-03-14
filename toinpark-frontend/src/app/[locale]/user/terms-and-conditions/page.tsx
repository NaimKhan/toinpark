"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function TermsAndConditionsPage() {
  return (
    <div className="px-6 py-8 xl:px-16 md:px-12 md:py-12 w-full max-w-7xl">
      <Card className="bg-transparent border-none shadow-none p-0">
        <CardHeader className="p-0 pb-8">
          <CardTitle className="text-3xl md:text-4xl font-bold text-left bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            Terms and Conditions
          </CardTitle>
          <p className="text-left text-muted-foreground mt-2">
            Last Updated: January 19, 2026
          </p>
        </CardHeader>
        <CardContent className="p-0 space-y-8 text-default-200 dark:text-default-100">
          <section className="space-y-4">
            <p className="leading-relaxed">
              Welcome to the TOI Community website. These Terms and Conditions
              (“Terms”) govern your access to and use of the TOI Community
              platform, owned and operated by the TOI DLT Foundation.
            </p>
            <p className="leading-relaxed">
              By accessing the website or participating in the community, you
              agree to be bound by these Terms. If you do not agree, please
              refrain from using our services.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">
              1. Corporate Identity & Governance
            </h2>
            <p className="leading-relaxed">
              The TOI Community website is a proprietary platform of the TOI DLT
              Foundation.
            </p>
            <ul className="list-disc pl-6 space-y-2 marker:text-primary">
              <li>
                <strong>Registration:</strong> TOI DLT Foundation is a licensed
                entity registered within the Abu Dhabi Global Market (ADGM),
                United Arab Emirates.
              </li>
              <li>
                <strong>Compliance:</strong> These Terms are governed by and
                construed in accordance with the laws and regulations of the
                ADGM.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">
              2. Data Privacy & Ownership
            </h2>
            <p className="leading-relaxed">
              Your privacy is a core pillar of our Web3 philosophy.
            </p>
            <ul className="list-disc pl-6 space-y-2 marker:text-primary">
              <li>
                <strong>Data Ownership:</strong> TOI DLT Foundation is the legal
                owner and custodian of the user data collected on this platform.
              </li>
              <li>
                <strong>Minimalist Collection:</strong> We do not collect
                extensive personal data. We only collect your email address and
                mobile number for the sole purpose of sending One-Time Passwords
                (OTP) for secure authentication.
              </li>
              <li>
                <strong>Encryption & Security:</strong> All sensitive user data
                is stored using industry-standard encryption protocols to ensure
                it remains safe and secured.
              </li>
              <li>
                <strong>Third-Party Disclosure:</strong> We never sell your
                data. Data is only shared with essential third-party service
                providers (e.g., SMS gateways or email delivery services)
                necessary to serve our customers and maintain platform
                functionality.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">
              3. The TOI Ecosystem (Web3 & Staking)
            </h2>
            <p className="leading-relaxed">
              TOI Community is a decentralized-focused platform where users
              interact with the TOIN token.
            </p>
            <ul className="list-disc pl-6 space-y-2 marker:text-primary">
              <li>
                <strong>Staking:</strong> Users may choose to stake TOIN tokens
                within the platform. Staking involves locking tokens for a
                specific period; please be aware of the inherent risks
                associated with digital assets.
              </li>
              <li>
                <strong>Weekly Challenges:</strong> Users can earn rewards by
                participating in and completing weekly community challenges and
                sharing content as defined by the platform’s current campaign.
              </li>
              <li>
                <strong>Rewards:</strong> Rewards are distributed based on
                algorithmic verification of challenge completion. TOI DLT
                Foundation reserves the right to audit participation to prevent
                sybil attacks or fraudulent activity.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">
              4. User Responsibilities
            </h2>
            <p className="leading-relaxed">
              As a member of the TOI Community, you agree:
            </p>
            <ul className="list-disc pl-6 space-y-2 marker:text-primary">
              <li>
                To provide accurate contact information for OTP verification.
              </li>
              <li>
                To maintain the security of your own digital wallet and
                credentials.
              </li>
              <li>
                Not to engage in any activity that interferes with the
                platform&apos;s operation or integrity.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">
              5. Limitation of Liability
            </h2>
            <p className="leading-relaxed">
              TOI DLT Foundation provides the platform on an &quot;as-is&quot;
              basis. While we maintain high security standards, we are not liable
              for losses resulting from:
            </p>
            <ul className="list-disc pl-6 space-y-2 marker:text-primary">
              <li>User-side security breaches (e.g., losing private keys).</li>
              <li>Market volatility affecting the value of TOIN.</li>
              <li>Temporary service interruptions for maintenance.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">
              6. Amendments
            </h2>
            <p className="leading-relaxed">
              We reserve the right to update these Terms at any time. Continued
              use of the website following changes constitutes acceptance of the
              revised Terms.
            </p>
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
