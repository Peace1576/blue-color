import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center px-4">
      <div className="mb-8 text-center">
        <span className="text-2xl font-bold text-white">BlueCollar</span>
        <span className="text-2xl font-bold text-orange-500">Bids</span>
        <p className="text-gray-400 text-sm mt-2">Create your account to get started</p>
      </div>
      <SignUp
        appearance={{
          elements: {
            rootBox: 'w-full max-w-md',
            card: 'bg-gray-900 border border-white/10 shadow-xl',
            headerTitle: 'text-white',
            headerSubtitle: 'text-gray-400',
            socialButtonsBlockButton: 'bg-gray-800 border-white/10 text-white hover:bg-gray-700',
            formFieldLabel: 'text-gray-300',
            formFieldInput: 'bg-gray-800 border-gray-700 text-white',
            footerActionLink: 'text-orange-500 hover:text-orange-400',
            formButtonPrimary: 'bg-orange-500 hover:bg-orange-400',
          },
        }}
        forceRedirectUrl="/subscribe"
      />
    </div>
  );
}
