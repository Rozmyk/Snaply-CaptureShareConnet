'use client'
import LoginForm from './LoginForm/LoginForm'
import LoginMockup from '../LoginMockup/LoginMockup'
import { Container, Grid } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { Center } from '@mantine/core'
import Footer from '../../Footer/Footer'
const LoginContainer = () => {
	const isSmallScreen = useMediaQuery('(max-width: 875px)')
	return (
		<Container mt='xl' size='md'>
			<Grid justify='center' align='center'>
				{!isSmallScreen && (
					<Grid.Col xs={12} sm={6} md={6} lg={6}>
						<Center>
							<LoginMockup />
						</Center>
					</Grid.Col>
				)}

				<Grid.Col xs={12} sm={6} md={6} lg={6}>
					<Center>
						<LoginForm />
					</Center>
				</Grid.Col>
			</Grid>
			<Footer />
		</Container>
	)
}

export default LoginContainer
