export const metadata = {
  title: 'Privacy Policy — BlueCollar Bids',
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <a href="/" className="text-orange-500 text-sm hover:text-orange-400 transition-colors mb-8 inline-block">
          &larr; Back to Home
        </a>
        <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-gray-500 text-sm mb-10">Last updated: April 19, 2025</p>

        <div className="space-y-8 text-gray-300 leading-relaxed">

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Overview</h2>
            <p>
              BlueCollar Bids (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) respects your privacy. This Privacy
              Policy explains what information we collect, how we use it, and your rights
              regarding that information. By using the Service, you consent to the practices
              described in this Policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Information We Collect</h2>
            <p className="font-medium text-white mb-2">Information you provide directly:</p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              <li>Email address (required to create an account and receive communications)</li>
              <li>Payment information — processed and stored exclusively by Stripe; we never store your card number, CVV, or full payment details</li>
            </ul>
            <p className="font-medium text-white mb-2">Information collected automatically:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>IP address and general geographic location (country/state level)</li>
              <li>Browser type and version</li>
              <li>Pages visited and time spent on the Service</li>
              <li>Referring URLs</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. How We Use Your Information</h2>
            <p>We use collected information to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Provide and maintain the Service</li>
              <li>Process subscription payments through Stripe</li>
              <li>Send transactional emails (receipts, account notices, service updates)</li>
              <li>Respond to support inquiries</li>
              <li>Monitor and improve Service performance and reliability</li>
              <li>Detect and prevent fraud or abuse</li>
              <li>Comply with legal obligations</li>
            </ul>
            <p className="mt-3">
              We do not sell, rent, or trade your personal information to any third party
              for marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Third-Party Service Providers</h2>
            <p>
              We use the following third-party services to operate the platform. Each has
              its own privacy policy governing how they handle your data:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>
                <span className="text-white font-medium">Stripe</span> — payment processing.
                Your payment information is transmitted directly to Stripe and governed by
                Stripe&rsquo;s Privacy Policy.
              </li>
              <li>
                <span className="text-white font-medium">Supabase</span> — database and
                backend infrastructure. Your email address and subscription status are
                stored in a Supabase-hosted database.
              </li>
              <li>
                <span className="text-white font-medium">Vercel</span> — web hosting and
                content delivery. Vercel processes request data including IP addresses as
                part of hosting the Service.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Data Retention</h2>
            <p>
              We retain your account information for as long as your subscription is active.
              If you cancel your subscription, we will retain your email and transaction
              history for up to 3 years for accounting and legal compliance purposes, after
              which it will be deleted or anonymized.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Security</h2>
            <p>
              We implement industry-standard security measures including encrypted data
              transmission (HTTPS/TLS), encrypted storage of sensitive values, and
              access-controlled databases. However, no method of transmission or storage
              is 100% secure. We cannot guarantee absolute security of your information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">7. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Request a copy of the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your account and associated data</li>
              <li>Opt out of non-transactional communications at any time</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, contact us at{' '}
              <a href="mailto:mwambatchishi@gmail.com" className="text-orange-500 hover:text-orange-400">
                mwambatchishi@gmail.com
              </a>. We will respond within 30 days.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">8. Cookies</h2>
            <p>
              The Service uses minimal cookies necessary for authentication and session
              management. We do not use advertising or tracking cookies. You may disable
              cookies in your browser settings, but this may affect the functionality of
              the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">9. Children&rsquo;s Privacy</h2>
            <p>
              The Service is not directed at individuals under the age of 18. We do not
              knowingly collect personal information from minors. If you believe a minor
              has provided us personal information, contact us and we will delete it
              promptly.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of
              material changes by email. Your continued use of the Service after any
              changes constitutes acceptance of the updated Policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">11. Contact</h2>
            <p>
              Privacy-related questions or requests may be directed to:{' '}
              <a href="mailto:mwambatchishi@gmail.com" className="text-orange-500 hover:text-orange-400">
                mwambatchishi@gmail.com
              </a>
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}
