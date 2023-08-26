import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Gamey',
  description: 'Created by shijaz ks',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <link rel="icon" href="favicon.ico" />
      <meta name="keywords" content="shijaz ks,jazdesign,gamey,gamey sage" /> 
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
