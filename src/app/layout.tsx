import type { Metadata } from 'next';
import { Nunito_Sans } from 'next/font/google';
import '@/styles/main.scss';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { getThemeFromServer } from '@/lib/theme/theme-server';

const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  weight: ['300', '600', '800'],
});

export const metadata: Metadata = {
  title: 'Countries App',
  description: 'A web application to explore countries information',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialTheme = await getThemeFromServer();

  return (
    <html lang="en" data-theme={initialTheme}>
      <body className={nunitoSans.className}>
        <ThemeProvider initialTheme={initialTheme}>
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
