import { SignUp } from '@clerk/nextjs';
import Link from 'next/link';

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gray-950 flex">
      {/* Left panel — brand + value props */}
      <div className="hidden lg:flex flex-col justify-between w-[52%] bg-gray-900 border-r border-white/10 px-14 py-12">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-extrabold text-white tracking-tight">BlueCollar</span>
          <span className="text-2xl font-extrabold text-orange-500 tracking-tight">Bids</span>
        </Link>

        <div>
          <p className="text-orange-500 text-sm font-semibold uppercase tracking-widest mb-4">
            Government contracts for trades
          </p>
          <h1 className="text-4xl font-extrabold text-white leading-tight mb-6">
            Win more federal<br />contracts — faster.
          </h1>
          <ul className="space-y-4">
            {[
              'Live bids from SAM.gov, updated every 6 hours',
              '10 trade NAICS categories covered',
              'Filter by state, set-aside type & deadline',
              'Direct links to original government postings',
              'Cancel anytime — no long-term commitment',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-gray-300 text-sm">
                <svg className="w-5 h-5 text-orange-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-gray-600 text-xs">
          &copy; {new Date().getFullYear()} BlueCollarBids. All rights reserved.
        </p>
      </div>

      {/* Right panel — sign-up form */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* Mobile logo */}
        <Link href="/" className="flex items-center gap-1 mb-8 lg:hidden">
          <span className="text-2xl font-extrabold text-white">BlueCollar</span>
          <span className="text-2xl font-extrabold text-orange-500">Bids</span>
        </Link>

        <div className="w-full max-w-md">
          <div className="mb-6 text-center lg:text-left">
            <h2 className="text-2xl font-bold text-white mb-1">Create your account</h2>
            <p className="text-gray-400 text-sm">
              Already have one?{' '}
              <Link href="/sign-in" className="text-orange-500 hover:text-orange-400 font-medium">
                Sign in
              </Link>
            </p>
          </div>

          <SignUp
            appearance={{
              layout: {
                showOptionalFields: false,
              },
              elements: {
                rootBox: 'w-full',
                card: 'bg-transparent shadow-none p-0 gap-0',
                cardBox: 'shadow-none',
                header: 'hidden',
                headerTitle: 'hidden',
                headerSubtitle: 'hidden',
                socialButtonsBlockButton:
                  'bg-gray-800 border border-white/10 text-white hover:bg-gray-700 transition-colors rounded-lg',
                socialButtonsBlockButtonText: 'text-sm font-medium',
                dividerRow: 'my-4',
                dividerText: 'text-gray-500 text-xs',
                dividerLine: 'bg-white/10',
                formFieldLabel: 'text-gray-300 text-sm font-medium mb-1',
                formFieldInput:
                  'bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:border-orange-500 focus:ring-orange-500 placeholder-gray-500',
                formButtonPrimary:
                  'bg-orange-500 hover:bg-orange-400 text-white font-bold py-3 rounded-lg transition-colors w-full mt-2',
                footerAction: 'hidden',
                footerActionLink: 'hidden',
                footer: 'hidden',
                identityPreviewEditButton: 'text-orange-500',
                formResendCodeLink: 'text-orange-500',
                otpCodeFieldInput: 'border-gray-700 bg-gray-800 text-white',
                alertText: 'text-red-400',
                formFieldErrorText: 'text-red-400 text-xs',
              },
            }}
            forceRedirectUrl="/subscribe"
          />

          <p className="text-xs text-gray-600 text-center mt-6">
            Secured by{' '}
            <span className="text-gray-500">Clerk</span>
            {' '}· By signing up you agree to our{' '}
            <Link href="/terms" className="hover:text-gray-400 underline">Terms</Link>
            {' '}and{' '}
            <Link href="/privacy" className="hover:text-gray-400 underline">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
