import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata={title:'Loopay — Support & Privacy',description:'Help with Loopay subscription tracking, reminders, your account, and privacy.',icons:{icon:(process.env.GITHUB_PAGES === 'true' ? '/loopay-support' : '') + '/loopay-icon.png'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}

