import { Flex, Stack, PasswordInput, TextInput, Anchor, Text, Box, Loader, Center } from '@mantine/core'
import { useForm } from '@mantine/form'
import logoBlack from '../../../../public/logoBlack.svg'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import CustomButton from '../../../CustomButton/CustomButton'
import { useRouter } from 'next/navigation'
const LoginForm = () => {
	const [errorMessage, setErrorMessage] = useState('')
	const [loading, setLoading] = useState(false)
	const router = useRouter()
	const form = useForm({
		initialValues: {
			email: '',
			password: '',
		},

		validate: {
			email: value => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
			password: val => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
		},
	})
	const signInUser = async () => {
		const email = form.values.email
		const password = form.values.password

		try {
			setLoading(true)
			const result = await signIn('credentials', { redirect: false, email, password })

			if (result?.error) {
				setLoading(false)
				setErrorMessage('Invalid email or password.')
				console.error('Login failed:', result.error)
			} else {
				setLoading(false)
				router.push('/')
				console.log('Login successful')
			}
		} catch (error) {
			console.error('Unexpected error:', error)
			setErrorMessage('An error has occurred. Try again.')
		}
	}
	useEffect(() => {
		setErrorMessage('')
	}, [form.values])
	return (
		<Box sx={{ maxWidth: 350 }}>
			<form onSubmit={form.onSubmit(signInUser)}>
				<Flex mb='lg' p='xl' direction='column' sx={{ border: '1px solid #DBDBDB' }}>
					<Flex direction='column' p='md' justify='center' align='center'>
						<Image src={logoBlack} width={100} alt='Snaply logo' />
					</Flex>

					<Stack>
						<TextInput
							sx={{
								'.mantine-TextInput-input': {
									backgroundColor: '#fbfbfa',
								},
							}}
							required
							placeholder='Email'
							{...form.getInputProps('email')}
							radius='md'
						/>

						<PasswordInput
							sx={{
								'.mantine-PasswordInput-input': {
									backgroundColor: '#fbfbfa',
								},
							}}
							required
							placeholder='Password'
							{...form.getInputProps('password')}
							radius='md'
						/>
					</Stack>
					{errorMessage && (
						<Text fz='sm' color='red' align='center' mb='xs' mt='xs'>
							{errorMessage}
						</Text>
					)}
					<Box mt='xl' mb='xl' w='100%'>
						<CustomButton
							fullWidth
							submitType={true}
							disabled={form.values.email.trim() == '' || form.values.password.trim() == ''}>
							{loading ? (
								<Center>
									<Loader size='xs' color='white' />{' '}
								</Center>
							) : (
								'Log in'
							)}
						</CustomButton>
					</Box>

					<Anchor href='/forgotPassword' mb='md' align='center' color='#00376B' size='xs'>
						Forgot password?
					</Anchor>
					<Text align='center' fz='xs' c='dimmed'>
						You can also report content you believe is unlawful in your country without logging in.
					</Text>
				</Flex>
				<Box>
					<Flex w='100%' justify='center' align='center' direction='column' p='xl' sx={{ border: '1px solid #DBDBDB' }}>
						<Text fz='sm'>
							Don&apos;t have an account?{' '}
							<Anchor href='/register' fw={600} color='#0095F6'>
								Sign up
							</Anchor>
						</Text>
					</Flex>
				</Box>
			</form>
		</Box>
	)
}

export default LoginForm
