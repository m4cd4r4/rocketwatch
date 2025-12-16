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
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://rocketwatch.app'),
  title: {
    default: 'RocketWatch - For the love of space',
    template: '%s | RocketWatch',
  },
  description:
    'A free, inclusive space hub for everyone from 5-year-olds to aerospace engineers. Track launches, watch live streams, and explore the cosmos.',
  keywords: [
    'space',
    'rockets',
    'launches',
    'SpaceX',
    'NASA',
    'astronomy',
    'live streams',
    'rocket launches',
    'space exploration',
    'satellites',
    'astronauts',
    'space agencies',
    'launch schedule',
  ],
  authors: [{ name: 'RocketWatch' }],
  creator: 'RocketWatch',
  publisher: 'RocketWatch',
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
    url: '/',
    siteName: 'RocketWatch',
    title: 'RocketWatch - For the love of space',
    description: 'Track every space launch, past, present, and future. Watch live streams and explore the cosmos.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'RocketWatch - Track space launches',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RocketWatch - For the love of space',
    description: 'Track every space launch, past, present, and future.',
    images: ['/og-image.png'],
    creator: '@rocketwatch',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },
  alternates: {
    canonical: '/',
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
