import '@/styles/globals.css'
import 'tailwindcss/tailwind.css'
import { cn } from '@/lib/utils'
import { Inter } from 'next/font/google'
import { cookies } from 'next/headers'
import { TRPCReactProvider } from '@/trpc/react'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Card } from '@/components/ui/card'
import { MyNavigationMenu } from '@/components/ui/navigation-menu'

const inter = Inter({
    subsets: ['latin'],
})

export const metadata = {
    title: 'Anochat',
    description: 'Anonymous chat for true sigmas',
    icons: [{ rel: 'icon', url: '/favicon.ico' }],
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body
                className={cn(
                    inter.className,
                    'bg-gray-700 flex flex-col min-h-screen px-12 pb-12 pt-4'
                )}
            >
                <ThemeProvider attribute="class" defaultTheme="dark">
                    <TRPCReactProvider cookies={cookies().toString()}>
                        <header className="text-violet-600 font-bold">
                            Anochat
                        </header>
                        <main className="flex items-center flex-1 justify-center">
                            <Card className="py-8 pl-6 w-[80%] h-[75vh] flex">
                                <MyNavigationMenu />
                                <div className="flex-1">{children}</div>
                            </Card>
                        </main>
                    </TRPCReactProvider>
                </ThemeProvider>
            </body>
        </html>
    )
}
