'use client'
import { Flex, useMantineColorScheme, Box } from '@mantine/core'
import { useSession } from 'next-auth/react'
import Navbar from '../../../components/ForgotPassword/Navbar/Navbar'
import Footer from '../../../components/Footer/Footer'
import ForgotPasswordForm from '../../../components/ForgotPassword/ForgotPasswordForm/ForgotPasswordForm'
const ForgotPassword = () => {
	const { data: session, status } = useSession()
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	return (
		<Box sx={{ backgroundColor: dark ? 'black' : '#fefeff', minHeight: '100vh', height: '100vh' }}>
			{status !== 'authenticated' && <Navbar />}
			<Flex h='100%' direction='column' justify='space-between'>
				<Flex mt='75px' justify='center' align='center' w='100%'>
					<ForgotPasswordForm />
				</Flex>
				<Footer />
			</Flex>
		</Box>
	)
}

export default ForgotPassword
