export const metadata = {
  title: 'Terms of Use — BlueCollar Bids',
};

export default function TermsOfUse() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <a href="/" className="text-orange-500 text-sm hover:text-orange-400 transition-colors mb-8 inline-block">
          &larr; Back to Home
        </a>
        <h1 className="text-3xl font-bold mb-2">Terms of Use</h1>
        <p className="text-gray-500 text-sm mb-10">Last updated: April 19, 2025</p>

        <div className="prose prose-invert max-w-none space-y-8 text-gray-300 leading-relaxed">

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Agreement to Terms</h2>
            <p>
              By accessing or using BlueCollar Bids (&ldquo;the Service&rdquo;), you agree to be bound by
              these Terms of Use (&ldquo;Terms&rdquo;). If you do not agree to these Terms, do not use
              the Service. These Terms constitute a legally binding agreement between you
              (&ldquo;User&rdquo;) and BlueCollar Bids (&ldquo;Company,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Description of Service</h2>
            <p>
              BlueCollar Bids is a subscription-based information aggregation service that
              retrieves and displays publicly available government contracting opportunities
              from SAM.gov and other public procurement databases. We provide this information
              as a convenience tool only.
            </p>
            <p className="mt-3">
              The Service does not submit bids on your behalf, provide legal advice,
              guarantee contract awards, or represent that any opportunity listed is
              accurate, complete, or current. All contracting decisions are solely your
              responsibility.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. Data Accuracy Disclaimer</h2>
            <p>
              All contract data displayed through the Service is sourced from third-party
              government databases, including SAM.gov, operated by the U.S. General Services
              Administration. We do not create, verify, or guarantee the accuracy,
              completeness, timeliness, or fitness for any particular purpose of this data.
            </p>
            <p className="mt-3">
              Listings may contain errors, omissions, or outdated information. You are solely
              responsible for independently verifying all contract details directly with the
              relevant government agency before taking any action. BlueCollar Bids is not
              liable for any loss, damage, or missed opportunity arising from reliance on
              data displayed through the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. No Guarantee of Contract Awards</h2>
            <p>
              Use of the Service does not guarantee that you will win, receive, or be
              considered for any government contract. We make no representations regarding
              your eligibility to bid on any listed opportunity. Eligibility requirements,
              licensing, bonding, insurance, and registration requirements are your sole
              responsibility to research and satisfy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Subscription and Payment</h2>
            <p>
              Access to the Service requires a paid subscription at the rate disclosed at
              the time of purchase. Subscriptions are billed on a recurring monthly basis
              via Stripe. By subscribing, you authorize us to charge your payment method
              on a recurring basis until you cancel.
            </p>
            <p className="mt-3">
              You may cancel your subscription at any time. Cancellation takes effect at
              the end of the current billing period. We do not provide refunds for partial
              billing periods. Prices are subject to change with 30 days&rsquo; written notice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Limitation of Liability</h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, BLUECOLLAR BIDS AND ITS
              OWNERS, OFFICERS, EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT,
              INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT
              LIMITED TO LOSS OF PROFITS, LOSS OF DATA, LOSS OF BUSINESS OPPORTUNITY, OR
              ANY OTHER COMMERCIAL DAMAGES OR LOSSES, ARISING OUT OF OR RELATED TO YOUR
              USE OF OR INABILITY TO USE THE SERVICE.
            </p>
            <p className="mt-3">
              IN NO EVENT SHALL OUR TOTAL LIABILITY TO YOU EXCEED THE TOTAL AMOUNT PAID BY
              YOU TO BLUECOLLAR BIDS IN THE THREE (3) MONTHS PRECEDING THE CLAIM.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">7. Disclaimer of Warranties</h2>
            <p>
              THE SERVICE IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; WITHOUT WARRANTIES OF
              ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES
              OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
              WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR
              FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">8. User Responsibilities</h2>
            <p>You agree that you will:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Use the Service only for lawful purposes</li>
              <li>Not resell, redistribute, or sublicense any data obtained through the Service</li>
              <li>Not use automated tools to scrape, harvest, or extract data from the Service</li>
              <li>Not share your account credentials with any third party</li>
              <li>Comply with all applicable federal, state, and local laws and regulations when pursuing or submitting government bids</li>
              <li>Independently verify all contract information before submitting any bid</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">9. Intellectual Property</h2>
            <p>
              The Service, including its design, software, and original content, is owned
              by BlueCollar Bids and protected by applicable intellectual property laws.
              Government contract data displayed through the Service is public domain
              information sourced from federal databases. You may not copy, reproduce, or
              distribute the Service&rsquo;s interface or proprietary systems without written
              permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">10. Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold harmless BlueCollar Bids and its
              owners, officers, employees, and agents from and against any claims,
              liabilities, damages, losses, and expenses (including reasonable legal fees)
              arising out of or in any way connected with your use of the Service, your
              violation of these Terms, or your violation of any third-party rights.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">11. Termination</h2>
            <p>
              We reserve the right to suspend or terminate your access to the Service at
              any time for any reason, including violation of these Terms. Upon termination,
              your right to use the Service ceases immediately.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">12. Governing Law</h2>
            <p>
              These Terms are governed by and construed in accordance with the laws of the
              State of Arizona, without regard to its conflict of law provisions. Any
              disputes arising under these Terms shall be resolved exclusively in the state
              or federal courts located in Pima County, Arizona.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">13. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. We will notify you
              of material changes by email or by posting a notice on the Service. Your
              continued use of the Service after changes become effective constitutes your
              acceptance of the revised Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">14. Contact</h2>
            <p>
              Questions about these Terms may be directed to:{' '}
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
