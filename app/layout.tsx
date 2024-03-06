import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/app/global.sass'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'HTML Tag Search',
	description: 'Sample app that searches through HTML tags'
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={inter.className}>{children}</body>
		</html>
	)
}