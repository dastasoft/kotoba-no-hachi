import '~/styles/globals.css'

import { GeistSans } from 'geist/font/sans'
import { type Metadata } from 'next'

import FullScreenBackground from '~/components/FullScreenWrapperBackground'

export const metadata: Metadata = {
  title: '言葉の蜂 (Alpha)',
  description:
    '7つのかなまたは漢字を使って単語を作る日本語ワードゲーム。中央の文字を必ず含めるというルールで、語彙力を楽しく鍛えよう！',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="jp" className={`${GeistSans.variable}`}>
      <body>
        <FullScreenBackground imageAlt="言葉の蜂 logo">
          {children}
        </FullScreenBackground>
      </body>
    </html>
  )
}
