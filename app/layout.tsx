import './globals.css';
import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BackToTop from "@/components/ui/BackToTop";
import YoutubeButton from "@/components/ui/YoutubeButton";
import SplashScreen from "@/components/ui/SplashScreen";
import InstallPrompt from "@/components/ui/InstallPrompt";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});



const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://watchtolead.com'),
  title: {
    default: 'Watch to Lead - Learn English with Free Resources',
    template: '%s | Watch to Lead',
  },
  description: 'Watch to Lead offers free English learning resources including vocabulary builders, YouTube lessons, e-books, and quizzes to help you achieve fluency.',
  keywords: ['English learning', 'vocabulary builder', 'grammar tips', 'educational games', 'free english resources', 'watch to lead', 'IELTS preparation'],
  authors: [{ name: 'Hasan Rafay' }],
  creator: 'Hasan Rafay',
  publisher: 'Watch to Lead',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://watchtolead.com',
    title: 'Watch to Lead - Learn English with Free Resources',
    description: 'Master English with our free interactive tools, games, and comprehensive lessons.',
    siteName: 'Watch to Lead',
    images: [
      {
        url: '/Images/og-image.png', // We should ensure this exists or use a logo
        width: 1200,
        height: 630,
        alt: 'Watch to Lead - English Learning Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Watch to Lead - Learn English with Free Resources',
    description: 'Master English with our free interactive tools, games, and comprehensive lessons.',
    images: ['/Images/og-image.png'],
    creator: '@watchtolead',
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: '/manifest.json',
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (

    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jakarta.variable} font-sans`}>
        <link rel="icon" href="/favicon-new.ico" />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main>{children}</main>
          <YoutubeButton />
          <Footer />
        </ThemeProvider>
        <SplashScreen />
        <InstallPrompt />
        <BackToTop />
      </body>
    </html>

  );
}