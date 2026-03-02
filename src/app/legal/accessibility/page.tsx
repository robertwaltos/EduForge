import type { Metadata } from "next";
import SoftCard from "@/app/components/ui/soft-card";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description:
    "Koydo accessibility statement — our commitment to digital accessibility and compliance with WCAG 2.1 AA.",
};

export default function AccessibilityPage() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 py-12">
      <SoftCard as="header" className="border-accent/20 bg-[var(--gradient-hero)] p-6">
        <h1 className="text-3xl font-semibold tracking-tight">Accessibility Statement</h1>
        <p className="mt-2 text-sm text-foreground">
          Koydo is committed to ensuring digital accessibility for people of all abilities.
        </p>
      </SoftCard>

      <SoftCard as="section" className="space-y-3 p-5">
        <h2 className="text-lg font-semibold">Our Commitment</h2>
        <p className="text-sm text-foreground">
          We strive to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 at Level AA.
          These guidelines explain how to make web content more accessible for people with
          disabilities and more user-friendly for everyone. We continuously review and improve our
          platform to ensure an inclusive experience across all devices and assistive technologies.
        </p>
      </SoftCard>

      <SoftCard as="section" className="space-y-3 p-5">
        <h2 className="text-lg font-semibold">Standards and Compliance</h2>
        <p className="text-sm text-foreground">
          Koydo targets conformance with the following standards:
        </p>
        <ul className="ml-4 list-disc space-y-1 text-sm text-foreground">
          <li>WCAG 2.1 Level AA (Web Content Accessibility Guidelines)</li>
          <li>EN 301 549 (European Accessibility Standard)</li>
          <li>Section 508 of the Rehabilitation Act (US Federal Accessibility)</li>
          <li>European Accessibility Act (EAA) requirements effective June 2025</li>
        </ul>
      </SoftCard>

      <SoftCard as="section" className="space-y-3 p-5">
        <h2 className="text-lg font-semibold">Accessibility Features</h2>
        <p className="text-sm text-foreground">
          Our platform includes the following accessibility features:
        </p>
        <ul className="ml-4 list-disc space-y-1 text-sm text-foreground">
          <li>Semantic HTML with proper heading hierarchy and landmarks</li>
          <li>ARIA attributes for interactive components</li>
          <li>Keyboard navigable interface with visible focus indicators</li>
          <li>Sufficient colour contrast ratios meeting WCAG AA standards (minimum 4.5:1 for text)</li>
          <li>Dark mode with accessible contrast ratios</li>
          <li>Responsive design that works with assistive technologies across devices</li>
          <li>Touch targets meeting AA minimum sizing requirements (44×44 CSS pixels)</li>
          <li>Text resizing support without loss of content or functionality</li>
          <li>Media alternatives (alt text for images, captions where applicable)</li>
        </ul>
      </SoftCard>

      <SoftCard as="section" className="space-y-3 p-5">
        <h2 className="text-lg font-semibold">Testing</h2>
        <p className="text-sm text-foreground">
          We conduct automated accessibility audits using axe-core across 14 device profiles to
          detect and resolve WCAG violations. We test across Chromium, Firefox, and WebKit browsers,
          including mobile viewports (iPhone SE through iPad Pro) and desktop configurations.
          Our continuous integration pipeline runs accessibility checks on every code change.
        </p>
      </SoftCard>

      <SoftCard as="section" className="space-y-3 p-5">
        <h2 className="text-lg font-semibold">Known Limitations</h2>
        <p className="text-sm text-foreground">
          While we strive for full compliance, some third-party content or newly added features may
          have temporary accessibility gaps. We actively monitor and address these as part of our
          development process.
        </p>
      </SoftCard>

      <SoftCard as="section" className="space-y-3 p-5">
        <h2 className="text-lg font-semibold">Feedback and Contact</h2>
        <p className="text-sm text-foreground">
          We welcome your feedback on the accessibility of Koydo. If you encounter any barriers or
          have suggestions for improvement, please contact us:
        </p>
        <ul className="ml-4 list-disc space-y-1 text-sm text-foreground">
          <li>
            Email:{" "}
            <a href="mailto:support@koydo.app" className="text-accent underline hover:no-underline">
              support@koydo.app
            </a>
          </li>
          <li>
            Support page:{" "}
            <a href="/support" className="text-accent underline hover:no-underline">
              koydo.app/support
            </a>
          </li>
        </ul>
        <p className="mt-2 text-sm text-foreground">
          We aim to respond to accessibility feedback within 5 business days.
        </p>
      </SoftCard>

      <SoftCard as="section" className="space-y-3 p-5">
        <h2 className="text-lg font-semibold">Enforcement Procedure</h2>
        <p className="text-sm text-foreground">
          If you are not satisfied with our response, you have the right to file a complaint with
          your national enforcement body. In the EU, this may be your local equality body or digital
          accessibility authority. In the US, you can contact the Office for Civil Rights (OCR).
        </p>
      </SoftCard>
    </main>
  );
}
