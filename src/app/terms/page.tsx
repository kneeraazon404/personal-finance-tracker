import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | Budget Tracker",
  description: "Terms of Service for Budget Tracker",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen py-20 px-6">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>
      <div className="max-w-3xl mx-auto prose prose-neutral dark:prose-invert">
        <h1>Terms of Service</h1>
        <p className="text-muted-foreground">Last updated: February 9, 2026</p>

        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing and using Budget Tracker (&quot;the Service&quot;), you
          accept and agree to be bound by the terms and provision of this
          agreement.
        </p>

        <h2>2. Use License</h2>
        <p>
          Permission is granted to temporarily use the Service for personal,
          non-commercial transitory viewing only. This is the grant ofa license,
          not a transfer of title, and under this license you may not:
        </p>
        <ul>
          <li>Modify or copy the materials</li>
          <li>Use the materials for any commercial purpose</li>
          <li>
            Attempt to decompile or reverse engineer any software contained in
            the Service
          </li>
          <li>
            Remove any copyright or other proprietary notations from the
            materials
          </li>
        </ul>

        <h2>3. User Account</h2>
        <p>
          To access certain features of the Service, you must register for an
          account. You agree to:
        </p>
        <ul>
          <li>
            Provide accurate, current, and complete information during
            registration
          </li>
          <li>
            Maintain the security of your password and accept all risks of
            unauthorized access
          </li>
          <li>
            Notify us immediately upon becoming aware of any breach of security
          </li>
        </ul>

        <h2>4. Privacy</h2>
        <p>
          Your use of the Service is also governed by our Privacy Policy. Please
          review our Privacy Policy, which explains how we collect, use, and
          disclose information.
        </p>

        <h2>5. User Content</h2>
        <p>
          You retain all rights to the financial data and information you input
          into the Service. By using the Service, you grant us a license to use,
          store, and display your content solely for the purpose of providing
          the Service to you.
        </p>

        <h2>6. Prohibited Uses</h2>
        <p>You may not use the Service:</p>
        <ul>
          <li>In any way that violates any applicable law or regulation</li>
          <li>
            To transmit any malicious code or engage in any hacking activities
          </li>
          <li>To harass, abuse, or harm another person</li>
          <li>
            To impersonate or attempt to impersonate the Company or another user
          </li>
        </ul>

        <h2>7. Limitation of Liability</h2>
        <p>
          The Service is provided &quot;as is&quot; without warranties of any
          kind. We shall not be liable for any damages arising from the use or
          inability to use the Service, including but not limited to direct,
          indirect, incidental, or consequential damages.
        </p>

        <h2>8. Changes to Terms</h2>
        <p>
          We reserve the right to modify these terms at any time. We will notify
          users of any material changes by posting the new Terms of Service on
          this page.
        </p>

        <h2>9. Contact Us</h2>
        <p>
          If you have any questions about these Terms, please contact us at{" "}
          <a href="mailto:support@financetracker.com">
            support@financetracker.com
          </a>
        </p>
      </div>
    </div>
  );
}
