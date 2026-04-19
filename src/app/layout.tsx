import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BlueCollar Bids — Government contracts for trades workers',
  description:
    'Get notified the moment a federal or state government contract is posted that matches your trade. Electricians, plumbers, HVAC, concrete, and more.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-white antialiased">{children}</body>
    </html>
  );
}
