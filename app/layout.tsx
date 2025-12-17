import type { Metadata } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import '@/styles/globals.css';
import { QueryProvider } from '@/lib/providers/query-provider';
import { AgeModeProvider } from '@/lib/providers/age-mode-provider';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { MobileMenu } from '@/components/layout/mobile-menu';
import { PredictionTicker } from '@/components/ui/prediction-ticker';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://thegreatexpanse.com'),
  title: {
    default: 'The Great Expanse - Track Every Space Launch',
    template: '%s | The Great Expanse',
  },
  description:
    'Track upcoming rocket launches from SpaceX, NASA, ESA, and more. Watch live streams, explore space agencies, and never miss a launch. Free forever, no accounts, no paywalls.',
  keywords: [
    'space launches',
    'rocket launches',
    'SpaceX launches',
    'NASA launches',
    'space exploration',
    'live rocket streams',
    'launch schedule',
    'space agencies',
    'rockets',
    'satellites',
    'astronauts',
    'astronomy',
    'space news',
    'ISS',
    'Starship',
  ],
  authors: [{ name: 'The Great Expanse' }],
  creator: 'The Great Expanse',
  publisher: 'The Great Expanse',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://thegreatexpanse.com',
    siteName: 'The Great Expanse',
    title: 'The Great Expanse - Track Every Space Launch',
    description: 'Track upcoming rocket launches from SpaceX, NASA, ESA, and more. Watch live streams, explore space agencies, and never miss a launch.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'The Great Expanse - Track space launches',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Great Expanse - Track Every Space Launch',
    description: 'Track upcoming rocket launches from SpaceX, NASA, ESA, and more. Watch live streams and never miss a launch.',
    images: ['/og-image.png'],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },
  alternates: {
    canonical: 'https://thegreatexpanse.com',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen bg-void text-starlight antialiased">
        <QueryProvider>
          <AgeModeProvider>
            {/* Skip to main content for keyboard navigation */}
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-rocket-orange focus:px-4 focus:py-2 focus:text-white focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
            >
              Skip to main content
            </a>
            <div className="flex min-h-screen flex-col">
              <Header />
              <PredictionTicker />
              <MobileMenu />
              <main id="main-content" className="flex-1" tabIndex={-1}>
                {children}
              </main>
              <Footer />
            </div>
          </AgeModeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
