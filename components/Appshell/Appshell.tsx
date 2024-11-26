'use client'
import { ReactNode } from 'react'
import { AppShell, Container, Footer } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import Sidebar from './Sidebar/Sidebar'
import BottomNavigation from './BottomNavigation/BottomNavigation'
import MobileHeader from './MobileHeader/MobileHeader'
import LoadingScreen from '../LoadingScreen/LoadingScreen'
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import LoginPage from '../../src/app/login/page'
import ForgotPassword from '@/app/forgotPassword/page'
import RegisterPage from '@/app/register/page'

import { Notifications } from '@mantine/notifications'
function AppShellComponent({ children }: { children: ReactNode }) {
	const { data: session, status } = useSession()
	const isSmallScreen = useMediaQuery('(max-width: 720px)')
	const pathname = usePathname()

	if (status === 'loading') {
		return <LoadingScreen />
	}

	switch (true) {
		case pathname === '/forgotPassword' && !session:
			return <ForgotPassword />
		case pathname == '/register' && !session:
			return <RegisterPage />
		case !session && pathname !== '/post':
			return <LoginPage />

		default:
			if (isSmallScreen) {
				return (
					<AppShell
						padding={0}
						styles={theme => ({
							main: {
								backgroundColor: theme.colorScheme === 'dark' ? 'black' : 'white',
							},
						})}
						footer={
							<Footer height='50px' fixed>
								<BottomNavigation />
							</Footer>
						}>
						<MobileHeader />
						<Notifications />
						<Container m={0} p={0} size='lg'>
							{children}
						</Container>
					</AppShell>
				)
			} else {
				return (
					<AppShell
						sx={{ position: 'relative' }}
						padding={0}
						navbar={<Sidebar />}
						styles={theme => ({
							main: {
								backgroundColor: theme.colorScheme === 'dark' ? 'black' : 'white',
							},
						})}>
						<Notifications />
						<Container m={0} p={0} fluid>
							{children}
						</Container>
					</AppShell>
				)
			}
	}
}

export default AppShellComponent
