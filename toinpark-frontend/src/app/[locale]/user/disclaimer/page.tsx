"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function DisclaimerPage() {
  return (
    <div className="px-6 py-8 xl:px-16 md:px-12 md:py-12 w-full max-w-7xl">
      <Card className="bg-transparent border-none shadow-none p-0">
        <CardHeader className="p-0 pb-8">
          <CardTitle className="text-3xl md:text-4xl font-bold text-left bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            Disclaimer
          </CardTitle>
          <p className="text-left text-muted-foreground mt-2">
            Last Updated: January 19, 2026
          </p>
        </CardHeader>
        <CardContent className="p-0 space-y-8 text-default-200 dark:text-default-100">
          <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg text-amber-600 dark:text-amber-500">
            <p className="font-medium text-left">
              The following disclaimer applies to the TOI Community website and
              the use of the TOIN token. Please read this carefully before
              staking assets or participating in challenges.
            </p>
          </div>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">
              1. No Financial Advice
            </h2>
            <p className="leading-relaxed">
              All content, tools, and materials provided on the TOI Community
              website are for informational and community engagement purposes
              only. TOI DLT Foundation does not provide financial, investment,
              legal, or tax advice. You should consult with a professional
              advisor before making any decisions related to digital assets.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">
              2. Risk of Staking and Digital Assets
            </h2>
            <p className="leading-relaxed">
              Participation in the TOI ecosystem involves the use of blockchain
              technology and digital tokens (TOIN).
            </p>
            <ul className="list-disc pl-6 space-y-2 marker:text-primary">
              <li>
                <strong>Volatility:</strong> Digital assets are subject to high
                market volatility. The value of TOIN may fluctuate
                significantly.
              </li>
              <li>
                <strong>Smart Contract Risk:</strong> While we prioritize
                security, interactions with smart contracts carry inherent
                risks, including potential technical vulnerabilities.
              </li>
              <li>
                <strong>Loss of Value:</strong> By staking TOIN, you acknowledge
                that there is no guarantee of profit, and you may lose the total
                value of your staked assets.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">
              3. Rewards and Challenges
            </h2>
            <p className="leading-relaxed">
              The &quot;rewards&quot; earned through weekly challenges and
              sharing are incentives for community participation.
            </p>
            <ul className="list-disc pl-6 space-y-2 marker:text-primary">
              <li>
                <strong>No Guarantee:</strong> TOI DLT Foundation reserves the
                right to modify, suspend, or cancel reward programs or challenge
                criteria at any time without prior notice.
              </li>
              <li>
                <strong>Verification:</strong> Rewards are subject to
                verification. Any attempt to &quot;game&quot; the system, use
                bots, or engage in fraudulent sharing will result in
                disqualification and forfeiture of rewards.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">
              4. ADGM Regulatory Status
            </h2>
            <p className="leading-relaxed">
              While TOI DLT Foundation is a licensed entity registered with the
              Abu Dhabi Global Market (ADGM), this registration does not imply
              that a regulatory authority has endorsed the financial performance
              of TOIN or the specific outcome of staking activities. Users are
              responsible for ensuring their participation complies with the
              laws of their local jurisdiction.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">
              5. Limitation of Liability
            </h2>
            <p className="leading-relaxed">
              To the maximum extent permitted by the laws of the ADGM, TOI DLT
              Foundation, its directors, and employees shall not be liable for
              any direct, indirect, incidental, or consequential damages arising
              from:
            </p>
            <ul className="list-disc pl-6 space-y-2 marker:text-primary">
              <li>Your use of the TOI Community website.</li>
              <li>Fluctuations in the price of TOIN.</li>
              <li>
                Any unauthorized access to your personal digital wallet or
                private keys.
              </li>
            </ul>
          </section>

          <div className="mt-8 p-6 bg-muted/30 rounded-xl border border-border">
            <h3 className="text-xl font-bold mb-2">A Note to the Community</h3>
            <blockquote className="italic border-l-4 border-primary pl-4 py-1 my-4">
              &quot;Stake Responsibly.&quot; &gt; Blockchain technology is
              experimental and carries risks. Only participate with assets you
              can afford to lose. The TOI Community is built on sharing and
              innovation, not guaranteed financial returns.
            </blockquote>
          </div>
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
