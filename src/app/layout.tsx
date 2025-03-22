import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { ApolloWrapper } from './ApolloWrapper'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Bit a Bit PokeApi',
  description: 'Generado usando el API de PokeApi para el podcast de Bit a Bit',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  )
}
