import { Inter } from 'next/font/google'
import { AuthProvider } from '../../components/providers/AuthProvider'
import AppShellComponent from '../../components/Appshell/Appshell'
import { ThemeProvider } from '../../components/providers/ThemeProvider'
import { NotificationsProvider } from '../../context/NotificationsContext'
import { StoriesProvider } from '../../context/StoriesContext'
import OfflineAlertProvider from '../../components/providers/OfflineAlertProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
	title: 'Snaply',
	description: 'Capture. Share. Connect.',
}

export default function RootLayout({ children, modal }: { children: React.ReactNode; modal: React.ReactNode }) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<link rel='shortcut icon' href='/favicon.png' />
				<AuthProvider>
					<ThemeProvider>
						<OfflineAlertProvider>
							<NotificationsProvider>
								<StoriesProvider>
									<AppShellComponent>
										{children}
										{modal}
									</AppShellComponent>
								</StoriesProvider>
							</NotificationsProvider>
						</OfflineAlertProvider>
					</ThemeProvider>
				</AuthProvider>
			</body>
		</html>
	)
}
