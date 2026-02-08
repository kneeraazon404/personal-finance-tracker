import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Budget Tracker",
  description: "Privacy Policy for Budget Tracker",
};

export default function PrivacyPage() {
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
        <h1>Privacy Policy</h1>
        <p className="text-muted-foreground">Last updated: February 9, 2026</p>

        <h2>1. Information We Collect</h2>
        <p>
          We collect information that you provide directly to us, including:
        </p>
        <ul>
          <li>Account information (name, email address, password)</li>
          <li>Financial data (transactions, accounts, budgets, goals)</li>
          <li>Usage information (how you interact with the Service)</li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Provide, maintain, and improve our Service</li>
          <li>Process transactions and send related information</li>
          <li>Send technical notices, updates, and support messages</li>
          <li>Respond to your comments, questions, and requests</li>
          <li>Monitor and analyze trends, usage, and activities</li>
        </ul>

        <h2>3. Data Security</h2>
        <p>
          We implement industry-standard security measures to protect your
          personal information:
        </p>
        <ul>
          <li>End-to-end encryption for all financial data</li>
          <li>Secure HTTPS connections for all data transmission</li>
          <li>Regular security audits and updates</li>
          <li>Strict access controls and authentication requirements</li>
        </ul>

        <h2>4. Information Sharing</h2>
        <p>
          We do not sell, trade, or rent your personal information to third
          parties. We may share your information only in the following
          circumstances:
        </p>
        <ul>
          <li>With your consent or at your direction</li>
          <li>With service providers who perform services on our behalf</li>
          <li>To comply with legal obligations or respond to legal requests</li>
          <li>To protect our rights, property, or safety</li>
        </ul>

        <h2>5. Data Retention</h2>
        <p>
          We retain your personal information for as long as your account is
          active or as needed to provide you services. You may request deletion
          of your account and data at any time.
        </p>

        <h2>6. Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Access and receive a copy of your personal data</li>
          <li>Correct inaccurate or incomplete data</li>
          <li>Delete your account and associated data</li>
          <li>Export your data in a portable format</li>
          <li>Opt-out of marketing communications</li>
        </ul>

        <h2>7. Cookies and Tracking</h2>
        <p>
          We use cookies and similar tracking technologies to improve your
          experience. You can control cookies through your browser settings.
        </p>

        <h2>8. Third-Party Services</h2>
        <p>
          Our Service may contain links to third-party websites or services that
          are not owned or controlled by us. We are not responsible for the
          privacy practices of these third parties.
        </p>

        <h2>9. Children's Privacy</h2>
        <p>
          Our Service is not directed to children under 13. We do not knowingly
          collect personal information from children under 13.
        </p>

        <h2>10. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify
          you of any changes by posting the new Privacy Policy on this page and
          updating the &quot;Last updated&quot; date.
        </p>

        <h2>11. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us
          at{" "}
          <a href="mailto:privacy@financetracker.com">
            privacy@financetracker.com
          </a>
        </p>
      </div>
    </div>
  );
}
