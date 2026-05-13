import './globals.css';

export const metadata = {
  title: 'Eragon Exchange — referral route gateway',
  description: 'Аккуратный переходник по крипто-биржам: маршруты, ссылки, правила входа и риск-дисциплина.',
  openGraph: {
    title: 'Eragon Exchange',
    description: 'Routes. Gateway. Market access.',
    images: ['/images/brand/eragon_exchange_card_mockup.png'],
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon.ico' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    shortcut: ['/favicon.ico'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
