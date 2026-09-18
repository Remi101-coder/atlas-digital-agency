import type { Metadata } from "next";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { contactDetails } from "@/lib/contact-links";

export const metadata: Metadata = {
  title: "Privacy Policy | Atlas Digital Group",
  description: "How Atlas Digital Group LTD collects, uses and protects personal information.",
  alternates: {
    canonical: "/privacy-policy",
  },
};

const proseClass =
  "mx-auto mt-10 max-w-[760px] font-barlow text-slate-300 leading-relaxed " +
  "[&>h2]:font-unbounded [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-atlas-cream [&>h2]:mt-12 [&>h2]:mb-4 " +
  "[&>p]:mb-5 [&>p]:text-base " +
  "[&>ul]:mb-5 [&>ul]:list-disc [&>ul]:pl-6 [&>li]:mb-2 " +
  "[&_a]:text-atlas-gold [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-atlas-gold-light " +
  "[&_table]:w-full [&_table]:border-collapse [&_table]:text-sm " +
  "[&_th]:border [&_th]:border-slate-700 [&_th]:bg-slate-900 [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:text-atlas-cream " +
  "[&_td]:border [&_td]:border-slate-800 [&_td]:px-3 [&_td]:py-2 [&_td]:align-top";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-atlas-cream">
      <Navbar />

      <article className="pt-40 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-noto-serif text-3xl sm:text-4xl md:text-5xl text-atlas-cream">Privacy Policy</h1>
          <p className="mt-4 text-sm text-slate-400">Last updated 17 September 2026</p>
        </div>

        <div className={proseClass}>
          <h2>About this policy</h2>
          <p>
            Atlas Digital Group LTD respects your privacy and handles personal information in accordance with
            applicable UK data protection law. This policy explains what information we collect through this
            website and our business relationships, why we use it, who we may share it with and the rights
            available to you.
          </p>

          <h2>Who we are</h2>
          <p>
            Atlas Digital Group LTD is the controller of the personal information described in this policy. The
            company is registered in England and Wales under company number 17321140, with its registered office
            at 19 Abigail House, 1 Richards Close, Harrow, HA1 2BX. You can contact us about privacy through the{" "}
            <Link href="/#contact">contact form on this website</Link> or through{" "}
            <a href={`mailto:${contactDetails.privacyEmail}`}>{contactDetails.privacyEmail}</a>.
          </p>

          <h2>Who this policy applies to</h2>
          <p>
            This policy applies to visitors to our website, people who contact us about our services, clients,
            prospective clients, suppliers and professional contacts. It does not cover websites operated by
            other organisations, even when we link to them.
          </p>

          <h2>Information we collect</h2>
          <p>Depending on how you interact with us, we may collect:</p>
          <ul>
            <li>your name, job title, company name, telephone number and email address;</li>
            <li>information about your enquiry, project, objectives, budget or preferred timescale;</li>
            <li>messages, meeting notes and other correspondence with us;</li>
            <li>contract, billing and transaction information where you become a client or supplier;</li>
            <li>technical and usage information, such as IP address, browser, device, pages viewed and referral source; and</li>
            <li>your communication and marketing preferences.</li>
          </ul>
          <p>
            We do not ask you to provide special category information or criminal offence information through
            the website. Please do not send this type of information unless it is necessary and we have agreed a
            secure way to receive it.
          </p>

          <h2>How we collect information</h2>
          <p>
            We collect information directly from you when you complete a form, email us, speak with us, book a
            meeting or enter into a business relationship. We may also collect technical information
            automatically through cookies and similar technologies. In limited cases, we may receive business
            contact information from a referral partner, a public business source or a service provider acting
            on your behalf.
          </p>

          <h2>Why we use personal information</h2>
          <table>
            <thead>
              <tr>
                <th>Purpose</th>
                <th>Information</th>
                <th>Lawful basis</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Respond to enquiries and prepare proposals</td>
                <td>Contact details, company and project information</td>
                <td>Steps requested before a contract, or our legitimate interest in responding to business enquiries</td>
              </tr>
              <tr>
                <td>Provide services and manage client relationships</td>
                <td>Contact, contract, project and billing information</td>
                <td>Contract and legal obligation</td>
              </tr>
              <tr>
                <td>Operate, secure and troubleshoot the website</td>
                <td>Technical, device and security information</td>
                <td>Our legitimate interest in keeping the website reliable and secure; legal obligation where applicable</td>
              </tr>
              <tr>
                <td>Measure and improve website performance</td>
                <td>Usage and analytics information</td>
                <td>Consent for non-essential cookies; our legitimate interest in improving the website once information has been lawfully collected</td>
              </tr>
              <tr>
                <td>Send relevant business marketing</td>
                <td>Contact details and marketing preferences</td>
                <td>Consent or legitimate interests, together with the rules that apply to electronic marketing</td>
              </tr>
              <tr>
                <td>Maintain records, manage accounts and meet legal duties</td>
                <td>Contract, transaction and correspondence records</td>
                <td>Legal obligation and our legitimate interest in running and protecting the business</td>
              </tr>
              <tr>
                <td>Establish, exercise or defend legal claims</td>
                <td>Relevant records and correspondence</td>
                <td>Legal obligation and legitimate interests</td>
              </tr>
            </tbody>
          </table>
          <p>
            Where we rely on legitimate interests, we consider the purpose, necessity and possible effect on the
            individual. You may object to this use in the circumstances described under Your rights.
          </p>

          <h2>Cookies and similar technologies</h2>
          <p>
            We may use essential cookies that are required for the website to function. If analytics or other
            non-essential technologies are enabled, we will ask for your consent before placing or reading them,
            unless a legal exemption applies. You can accept or reject optional cookies and change your choice at
            any time through Cookie Settings in the footer.
          </p>

          <h2>Marketing</h2>
          <p>
            We may send relevant information about our services where you have consented or where the law
            otherwise permits it. Every electronic marketing message will provide a simple way to opt out. You
            can also ask us to stop direct marketing at any time through the contact form. We will keep only the
            minimum information needed to respect an opt-out request.
          </p>

          <h2>Sharing personal information</h2>
          <p>
            We may share personal information with service providers that support our website, hosting, email,
            CRM, analytics, advertising, scheduling, payments, accounting or project delivery. We may also share
            information with professional advisers, insurers, regulators, public authorities or a purchaser of
            all or part of our business where this is necessary and lawful. Providers may use the information
            only for agreed purposes and must protect it appropriately. We do not sell personal information.
          </p>

          <h2>International transfers</h2>
          <p>
            Some service providers may process information outside the United Kingdom. Where UK data protection
            law requires safeguards, we will use an approved transfer mechanism, such as UK adequacy regulations,
            the International Data Transfer Agreement or the UK Addendum to approved standard contractual
            clauses, together with any additional safeguards that are appropriate.
          </p>

          <h2>How long we keep information</h2>
          <p>
            We keep personal information only for as long as it is needed for the purpose for which it was
            collected, including legal, accounting and reporting requirements. Enquiry records are normally kept
            for up to 24 months after the last meaningful contact. Core client, contract and financial records
            are normally kept for up to six years after the relevant relationship or transaction ends, unless a
            longer or shorter period is required. Marketing records are kept until you opt out or the information
            is no longer useful and accurate. Cookie durations are shown in the cookie settings panel.
          </p>

          <h2>Security</h2>
          <p>
            We use proportionate technical and organisational measures to protect personal information from
            unauthorised access, alteration, disclosure, loss or destruction. Access is limited to people and
            providers that need the information for their work. No internet service is completely secure, so we
            cannot guarantee absolute security.
          </p>

          <h2>Your rights</h2>
          <p>Depending on the circumstances, UK data protection law may give you the right to:</p>
          <ul>
            <li>ask for a copy of your personal information;</li>
            <li>correct inaccurate or incomplete information;</li>
            <li>ask us to erase information;</li>
            <li>restrict how information is used;</li>
            <li>object to certain uses, including direct marketing;</li>
            <li>receive certain information in a portable format; and</li>
            <li>withdraw consent at any time where we rely on consent.</li>
          </ul>
          <p>
            These rights are not absolute and may be limited by law. We may need to verify your identity before
            acting on a request. We normally respond within one month, although the law allows more time in some
            cases.
          </p>

          <h2>Automated decisions</h2>
          <p>
            We do not use personal information to make solely automated decisions that produce legal or similarly
            significant effects on individuals.
          </p>

          <h2>Children</h2>
          <p>
            Our website and services are intended for businesses and are not directed at children. We do not
            knowingly collect personal information from children through the website.
          </p>

          <h2>Changes to this policy</h2>
          <p>
            We may update this policy when our services, website tools or legal obligations change. The date at
            the top of the policy shows when it was last updated. Material changes will be communicated where
            appropriate.
          </p>

          <h2>Contact and complaints</h2>
          <p>
            Please contact Atlas Digital Group LTD through the <Link href="/#contact">website contact form</Link> if
            you have a question, want to exercise a data protection right or wish to make a complaint. We would
            appreciate the opportunity to address your concern first. You also have the right to complain to the
            Information Commissioner&apos;s Office at{" "}
            <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer">
              ico.org.uk
            </a>
            .
          </p>
        </div>
      </article>

      <Footer />
    </main>
  );
}
