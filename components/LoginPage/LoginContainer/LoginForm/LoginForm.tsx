import { Flex, Stack, PasswordInput, TextInput, Divider, Center, Anchor, Text, Box } from '@mantine/core'
import { useForm } from '@mantine/form'
import logoBlack from '../../../../public/logoBlack.svg'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import GoogleButton from '../../../GoogleButton/GoogleButton'
import CustomButton from '../../../CustomButton/CustomButton'
const LoginForm = () => {
	const form = useForm({
		initialValues: {
			email: '',
			password: '',
			errorText: '',
		},

		validate: {
			email: value => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
			password: val => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
		},
	})
	const singInUser = async () => {
		const email = form.values.email
		const password = form.values.password
		try {
			await signIn('credentials', { email, password })
			console.log(signIn)
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<Box sx={{ maxWidth: 350 }}>
			<form onSubmit={form.onSubmit(singInUser)}>
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
					<Box mt='xl' mb='xl' w='100%'>
						<CustomButton
							fullWidth
							submitType={true}
							disabled={form.values.email.trim() == '' || form.values.password.trim() == ''}>
							Log in
						</CustomButton>
					</Box>

					<Divider
						sx={{ fontWeight: 600, color: '#737373', width: '100%' }}
						my='xs'
						label='OR'
						labelPosition='center'
					/>
					<Center mt='sm'>
						<GoogleButton />
					</Center>
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
