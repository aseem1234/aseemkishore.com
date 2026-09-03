import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import { breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Flip Privacy Policy",
  description:
    "Privacy policy for Flip, the coin-flip iPhone app from AK Internet Consulting, Inc. What the app stores on your device, how Pro iCloud Backup and AI Generate work, and what we never collect.",
  alternates: { canonical: "/flip-privacy" },
};

const lastUpdated = "3 September 2026";

export default function FlipPrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Flip Privacy Policy", path: "/flip-privacy" },
        ])}
      />
      <PageHero
        eyebrow="Flip for iPhone"
        title="Flip Privacy Policy"
        description="Flip is a coin-flip iPhone app from AK Internet Consulting, Inc. It does not create an account and does not require you to sign in."
      />

      <p className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
        Last updated {lastUpdated}
      </p>

      <section className="mt-16">
        <h2 className="text-2xl font-bold text-zinc-50">What Flip stores on your device</h2>
        <ul className="mt-4 list-disc space-y-3 pl-5 text-zinc-400">
          <li>
            Coin-flip results (last 20) and your selected coin faces. Custom photos, saved
            AI-generated faces, and short labels you set for heads/tails stay on the device (and in
            the App Group used by the optional Home Screen widget).
          </li>
          <li>
            If Flip Pro iCloud Backup is on, custom photos, saved AI faces, and settings can also
            upload to your iCloud. See iCloud Backup below.
          </li>
          <li>
            Flip uses Apple&rsquo;s <code className="font-mono text-zinc-300">SecRandomCopyBytes</code>{" "}
            for the heads/tails outcome. That happens on-device.
          </li>
          <li>
            Purchases go through StoreKit: yearly $0.99 with a 1-month introductory offer, plus
            optional lifetime $4.99. There is no local first-launch trial.
          </li>
        </ul>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-bold text-zinc-50">iCloud Backup (Flip Pro)</h2>
        <ul className="mt-4 list-disc space-y-3 pl-5 text-zinc-400">
          <li>
            Flip Pro can back up to your own iCloud via Apple CloudKit (container{" "}
            <code className="font-mono text-zinc-300">iCloud.com.akinternetconsulting.flip</code>
            ). Backup is on by default for Pro and can be turned off in Flip settings.
          </li>
          <li>
            What can be backed up: app settings (selected faces, labels/Face Text, backdrop, mute,
            sit poses), custom photo faces you picked from your library, and AI-generated coin-face
            pairs you saved.
          </li>
          <li>
            This content is stored in your iCloud account, not on AK Internet Consulting servers.
            We cannot read it.
          </li>
          <li>
            Turning backup off stops new uploads. Existing iCloud copies remain until you delete
            Flip data from iCloud (Settings → Apple Account → iCloud).
          </li>
          <li>
            Custom photos and AI images also stay on-device (and in the App Group used by the
            optional Home Screen widget) whether or not backup is on.
          </li>
        </ul>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-bold text-zinc-50">AI Generate (Flip Pro)</h2>
        <ul className="mt-4 list-disc space-y-3 pl-5 text-zinc-400">
          <li>Optional. Limited to 2 generations per Apple-account day.</li>
          <li>
            The app sends your short prompt plus a StoreKit 2 signed transaction to{" "}
            <code className="font-mono text-zinc-300">https://flip-api.aseemkishore.com</code> so we
            can verify Pro status and generate a coin-face image.
          </li>
          <li>
            The server checks a local safety list and OpenAI moderation, then calls OpenAI image
            generation. Blocked or failed generations are not counted against the daily cap.
          </li>
          <li>
            We do not put an OpenAI API key in the app. Prompts that look like celebrity, adult, or
            other disallowed content are rejected.
          </li>
          <li>
            Generated images are returned to the device for use as coin faces. We do not sell this
            data. Saved generated faces may also sync via iCloud Backup if Pro backup is on (see
            above).
          </li>
        </ul>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-bold text-zinc-50">What we do not do</h2>
        <ul className="mt-4 list-disc space-y-3 pl-5 text-zinc-400">
          <li>
            No account system, no advertising ID collection for ads, no third-party analytics SDK
            in v1.
          </li>
          <li>Flip is not a brokerage and does not place trades.</li>
          <li>We do not sell personal information.</li>
        </ul>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-bold text-zinc-50">Apple</h2>
        <p className="mt-4 text-zinc-400">
          Purchases and Restore go through Apple. Apple&rsquo;s privacy policy applies to App Store /
          StoreKit data.
        </p>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-bold text-zinc-50">Contact</h2>
        <p className="mt-4 text-zinc-400">
          Questions:{" "}
          <a
            href="mailto:legal@akinternetconsulting.com"
            className="text-blue-400 hover:text-blue-300"
          >
            legal@akinternetconsulting.com
          </a>{" "}
          (or{" "}
          <a href="mailto:hello@aseemkishore.com" className="text-blue-400 hover:text-blue-300">
            hello@aseemkishore.com
          </a>
          ).
        </p>
        <p className="mt-3 text-zinc-400">AK Internet Consulting, Inc., Clarksville, Maryland, USA.</p>
      </section>
    </div>
  );
}
