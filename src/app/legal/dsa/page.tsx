import type { Metadata } from "next";
import SoftCard from "@/app/components/ui/soft-card";

export const metadata: Metadata = {
  title: "Digital Services Act — Transparency Notice",
  description:
    "Koydo transparency notice under the EU Digital Services Act (DSA). Content moderation, reporting, and point of contact information.",
};

export default function DsaTransparencyPage() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 py-12">
      <SoftCard as="header" className="border-accent/20 bg-[var(--gradient-hero)] p-6">
        <h1 className="text-3xl font-semibold tracking-tight">
          Digital Services Act — Transparency Notice
        </h1>
        <p className="mt-2 text-sm text-foreground">
          This page provides transparency information required under Regulation (EU) 2022/2065
          (the Digital Services Act).
        </p>
      </SoftCard>

      <SoftCard as="section" className="space-y-3 p-5">
        <h2 className="text-lg font-semibold">Service Provider</h2>
        <ul className="ml-4 list-disc space-y-1 text-sm text-foreground">
          <li><strong>Service name:</strong> Koydo</li>
          <li><strong>Type of service:</strong> Online educational platform</li>
          <li><strong>Operator:</strong> Koydo (sole proprietorship)</li>
          <li>
            <strong>Contact email:</strong>{" "}
            <a href="mailto:dsa@koydo.app" className="text-accent underline hover:no-underline">
              dsa@koydo.app
            </a>
          </li>
          <li>
            <strong>Support contact:</strong>{" "}
            <a href="mailto:support@koydo.app" className="text-accent underline hover:no-underline">
              support@koydo.app
            </a>
          </li>
        </ul>
      </SoftCard>

      <SoftCard as="section" className="space-y-3 p-5">
        <h2 className="text-lg font-semibold">Point of Contact (Article 12)</h2>
        <p className="text-sm text-foreground">
          Pursuant to Article 12 of the DSA, our single point of contact for communications with
          Member State authorities, the European Commission, and the European Board for Digital
          Services is:
        </p>
        <p className="text-sm text-foreground">
          <strong>Email:</strong>{" "}
          <a href="mailto:dsa@koydo.app" className="text-accent underline hover:no-underline">
            dsa@koydo.app
          </a>
        </p>
        <p className="text-sm text-foreground">
          <strong>Languages:</strong> English, Spanish, French
        </p>
      </SoftCard>

      <SoftCard as="section" className="space-y-3 p-5">
        <h2 className="text-lg font-semibold">Legal Representative in the EU (Article 13)</h2>
        <p className="text-sm text-foreground">
          If the service operator is established outside the EU, a legal representative within the
          EU will be designated as required by Article 13 and details will be published here once
          appointed. Until then, inquiries may be directed to{" "}
          <a href="mailto:dsa@koydo.app" className="text-accent underline hover:no-underline">
            dsa@koydo.app
          </a>.
        </p>
      </SoftCard>

      <SoftCard as="section" className="space-y-3 p-5">
        <h2 className="text-lg font-semibold">Content Moderation (Articles 14–16)</h2>
        <p className="text-sm text-foreground">
          Koydo is primarily an educational content platform. User-generated content on Koydo is
          limited to:
        </p>
        <ul className="ml-4 list-disc space-y-1 text-sm text-foreground">
          <li>Support ticket descriptions submitted through the support page</li>
          <li>Account profile information (display name)</li>
        </ul>
        <p className="mt-2 text-sm text-foreground">
          We do not host a marketplace, social forum, or open publishing platform. All educational
          content (lessons, modules, quizzes) is created and curated by Koydo. We reserve the right
          to remove or restrict content that violates our{" "}
          <a href="/legal/terms" className="text-accent underline hover:no-underline">
            Terms of Service
          </a>
          , including content that is illegal, abusive, or harmful.
        </p>
      </SoftCard>

      <SoftCard as="section" className="space-y-3 p-5">
        <h2 className="text-lg font-semibold">Reporting Mechanisms (Article 16)</h2>
        <p className="text-sm text-foreground">
          Users may report illegal or objectionable content by contacting us at{" "}
          <a href="mailto:support@koydo.app" className="text-accent underline hover:no-underline">
            support@koydo.app
          </a>{" "}
          or via our{" "}
          <a href="/support" className="text-accent underline hover:no-underline">
            support page
          </a>
          . Reports should include a description of the content, its location, and the reason it
          is considered illegal or in violation of our terms. We aim to acknowledge reports within
          72 hours and will take action promptly where appropriate.
        </p>
      </SoftCard>

      <SoftCard as="section" className="space-y-3 p-5">
        <h2 className="text-lg font-semibold">Transparency Reporting (Article 15)</h2>
        <p className="text-sm text-foreground">
          Given the limited scope of user-generated content on our platform, we currently receive
          minimal content moderation requests. If and when volumes increase, we will publish
          periodic transparency reports as required by Article 15, covering:
        </p>
        <ul className="ml-4 list-disc space-y-1 text-sm text-foreground">
          <li>Number of content removal requests received</li>
          <li>Number of orders received from Member State authorities</li>
          <li>Actions taken and average response times</li>
          <li>Use of automated content moderation tools, if any</li>
        </ul>
      </SoftCard>

      <SoftCard as="section" className="space-y-3 p-5">
        <h2 className="text-lg font-semibold">Recommender Systems (Article 27)</h2>
        <p className="text-sm text-foreground">
          Koydo suggests educational content based on the learner&apos;s selected age/grade stage
          and subject preferences. This recommendation is deterministic (not AI-driven profiling)
          and based solely on curriculum mapping. No user profiling for advertising purposes is
          performed. Users can browse all available content via the{" "}
          <a href="/explore" className="text-accent underline hover:no-underline">
            Explore
          </a>{" "}
          and{" "}
          <a href="/modules" className="text-accent underline hover:no-underline">
            Modules
          </a>{" "}
          pages without relying on recommendations.
        </p>
      </SoftCard>

      <SoftCard as="section" className="space-y-3 p-5">
        <h2 className="text-lg font-semibold">Protection of Minors (Article 28)</h2>
        <p className="text-sm text-foreground">
          Koydo takes the protection of minors seriously. We enforce an age-gate during account
          creation with a threshold of 13 years (COPPA). For users under 13, verified parental
          consent is required before account activation. Analytics tracking is disabled for all
          users unless they (or their parent/guardian) provide explicit consent. Read more in our{" "}
          <a href="/legal/privacy" className="text-accent underline hover:no-underline">
            Privacy Policy
          </a>
          .
        </p>
      </SoftCard>

      <SoftCard as="section" className="space-y-3 p-5">
        <h2 className="text-lg font-semibold">Right to Complaint (Article 20)</h2>
        <p className="text-sm text-foreground">
          If you disagree with a content moderation decision, you may submit a complaint to{" "}
          <a href="mailto:dsa@koydo.app" className="text-accent underline hover:no-underline">
            dsa@koydo.app
          </a>
          . We will review the complaint and provide a reasoned response. You also have the right
          to refer the matter to an out-of-court dispute settlement body certified under Article 21,
          or to seek judicial remedy.
        </p>
      </SoftCard>
    </main>
  );
}
