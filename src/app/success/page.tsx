export default function SuccessPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <div className="text-6xl mb-6">🎉</div>
      <h1 className="text-4xl font-bold mb-4">You&apos;re in!</h1>
      <p className="text-gray-400 text-lg max-w-md">
        Your subscription is active. Check your inbox — you&apos;ll get an email with
        your dashboard link within the next few minutes.
      </p>
      <a
        href="/dashboard"
        className="mt-8 bg-orange-500 hover:bg-orange-400 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
      >
        Go to Dashboard
      </a>
    </main>
  );
}
