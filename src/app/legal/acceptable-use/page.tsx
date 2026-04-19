export const metadata = {
  title: 'Acceptable Use Policy — BlueCollar Bids',
};

export default function AcceptableUsePolicy() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <a href="/" className="text-orange-500 text-sm hover:text-orange-400 transition-colors mb-8 inline-block">
          &larr; Back to Home
        </a>
        <h1 className="text-3xl font-bold mb-2">Acceptable Use Policy</h1>
        <p className="text-gray-500 text-sm mb-10">Last updated: April 19, 2025</p>

        <div className="space-y-8 text-gray-300 leading-relaxed">

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Purpose</h2>
            <p>
              This Acceptable Use Policy (&ldquo;AUP&rdquo;) governs your use of the BlueCollar Bids
              platform and services. By using the Service, you agree to comply with this
              AUP. Violations may result in immediate suspension or termination of your
              account without refund.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Permitted Uses</h2>
            <p>You may use the Service solely to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Browse and research government contracting opportunities for your own business</li>
              <li>Filter and identify opportunities relevant to your licensed trade</li>
              <li>Access linked government postings for the purpose of preparing your own bids</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. Prohibited Uses</h2>
            <p>You may not use the Service to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>
                <span className="text-white font-medium">Resell or redistribute data.</span>{' '}
                You may not resell, redistribute, sublicense, or commercially exploit any
                data or content obtained through the Service to any third party.
              </li>
              <li>
                <span className="text-white font-medium">Automated scraping.</span>{' '}
                You may not use bots, crawlers, scrapers, or any automated tool to extract,
                harvest, or download data from the Service in bulk.
              </li>
              <li>
                <span className="text-white font-medium">Account sharing.</span>{' '}
                Your subscription is for a single user only. You may not share your login
                credentials with any other person or entity.
              </li>
              <li>
                <span className="text-white font-medium">Circumvent security.</span>{' '}
                You may not attempt to bypass, disable, or circumvent any security measures,
                access controls, or technical restrictions of the Service.
              </li>
              <li>
                <span className="text-white font-medium">Fraudulent bidding.</span>{' '}
                You may not use data from the Service to submit fraudulent, false, or
                misleading bids to any government agency.
              </li>
              <li>
                <span className="text-white font-medium">Illegal activity.</span>{' '}
                You may not use the Service in connection with any activity that violates
                federal, state, or local law, including but not limited to bid rigging,
                price fixing, or procurement fraud.
              </li>
              <li>
                <span className="text-white font-medium">Competitive misuse.</span>{' '}
                You may not use the Service to build a competing product or service, or
                to benchmark the Service for the purpose of developing a competing
                data aggregation platform.
              </li>
              <li>
                <span className="text-white font-medium">Harassment or abuse.</span>{' '}
                You may not use any information accessed through the Service to harass,
                threaten, or harm any individual, government employee, or contracting officer.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Compliance with Government Regulations</h2>
            <p>
              You are solely responsible for ensuring that your use of government contract
              data and your bidding activities comply with all applicable laws and
              regulations, including the Federal Acquisition Regulation (FAR), applicable
              state procurement rules, and any agency-specific requirements.
            </p>
            <p className="mt-3">
              BlueCollar Bids is an independent information tool and is not affiliated with,
              endorsed by, or sponsored by any government agency, including the U.S. General
              Services Administration or SAM.gov.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. No Liability for Your Actions</h2>
            <p>
              BlueCollar Bids is not responsible for any bids you submit, contracts you
              enter into, work you perform, or legal obligations you incur as a result of
              using the Service. You assume full responsibility for all actions taken based
              on information obtained through the Service.
            </p>
            <p className="mt-3">
              We expressly disclaim any liability for fines, penalties, debarment,
              suspension, or legal action arising from your bidding activities or your
              failure to comply with applicable government contracting regulations.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Enforcement</h2>
            <p>
              We reserve the right to investigate suspected violations of this AUP. If we
              determine that a violation has occurred, we may, at our sole discretion:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Issue a warning</li>
              <li>Suspend access to the Service</li>
              <li>Permanently terminate your account without refund</li>
              <li>Report unlawful activity to appropriate law enforcement authorities</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">7. Reporting Violations</h2>
            <p>
              If you become aware of any misuse of the Service, please report it to{' '}
              <a href="mailto:mwambatchishi@gmail.com" className="text-orange-500 hover:text-orange-400">
                mwambatchishi@gmail.com
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">8. Changes to This Policy</h2>
            <p>
              We may update this AUP at any time. Continued use of the Service after
              changes are posted constitutes your acceptance of the revised policy.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}
