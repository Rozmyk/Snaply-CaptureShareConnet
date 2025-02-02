'use client'
import { Flex, useMantineColorScheme, Box } from '@mantine/core'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Navbar from '../../../components/ForgotPassword/Navbar/Navbar'
import Footer from '../../../components/Footer/Footer'
import ForgotPasswordForm from '../../../components/ForgotPassword/ForgotPasswordForm/ForgotPasswordForm'
const ForgotPassword = () => {
	const { data: session, status } = useSession()
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	const router = useRouter()
	const [isClient, setIsClient] = useState(false)

	useEffect(() => {
		setIsClient(true)

		if (status === 'authenticated') {
			router.push('/')
		}
	}, [status, router])

	if (!isClient || status === 'loading' || status === 'authenticated') {
		return null
	}
	return (
		<Box sx={{ backgroundColor: dark ? 'black' : '#fefeff', minHeight: '100vh', height: '100vh' }}>
			<Navbar />
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
