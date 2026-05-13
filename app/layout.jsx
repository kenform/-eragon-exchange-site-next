import './globals.css';

export const metadata = {
  metadataBase: new URL('https://eragon-exchange-site-next-kenformgod-6184s-projects.vercel.app'),
  title: 'Eragon Exchange — referral route gateway',
  description: 'Аккуратный переходник по крипто-биржам: маршруты, ссылки, правила входа и риск-дисциплина.',
  openGraph: {
    title: 'Eragon Exchange',
    description: 'Routes. Gateway. Market access.',
    images: ['/images/brand/eragon_exchange_card_mockup.png'],
  },
  icons: {
    icon: '/images/brand/eragon_exchange_square_icon.png',
    apple: '/images/brand/eragon_exchange_square_icon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
