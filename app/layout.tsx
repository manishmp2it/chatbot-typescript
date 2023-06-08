'use client'
import './globals.css'
import { Inter } from 'next/font/google'
import toast, { Toaster } from 'react-hot-toast';
import { usePathname } from 'next/navigation';
import Sidebar from './components/sidebar/Sidebar';
import { SessionProvider } from "next-auth/react"



const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children, session }: { children: React.ReactNode, session: any }) {

  const params = usePathname();

  console.log(params);

  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <SessionProvider session={session}> */}
          <div className="flex">
            <Toaster />
            {params === "/login" || params==="/unique/user/chatbot" ? '' : <Sidebar />}
            <div className="flex-grow ">
              {children}
            </div>
          </div>
        {/* </SessionProvider> */}
      </body>
    </html>
  )
}
