'use client'
import { Flex, Text, TextInput, Button, Divider, Anchor, Box, useMantineColorScheme, Loader } from '@mantine/core'
import IconLock from '../IconLock/IconLock'
import { useState, useEffect } from 'react'
import { auth } from '@/app/firebase'
import { useForm } from '@mantine/form'
import { useSession } from 'next-auth/react'
import BackToLoginButton from './BackToLoginButton/BackToLoginButton'
import { sendPasswordResetEmail } from 'firebase/auth'
import ConfirmationMessage from './ConfirmationMessage/ConfirmationMessage'

const ForgotPasswordForm = () => {
	const [showConfirmationMessage, setShowConfirmationMessage] = useState(false)
	const [errorText, setErrorText] = useState('')
	const [loading, setLoading] = useState(false)
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	const { status } = useSession()
	const form = useForm({
		initialValues: {
			email: '',
			name: '',
			username: '',
			password: '',
		},

		validate: {
			email: value => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
		},
	})

	const resetEmail = async () => {
		try {
			setLoading(true)
			await sendPasswordResetEmail(auth, form.values.email)
			setShowConfirmationMessage(true)
			setLoading(false)
		} catch (err) {
			console.log(err)
			setErrorText('No users found')
		}
	}

	return (
		<>
			{showConfirmationMessage ? (
				<ConfirmationMessage email={form.values.email} />
			) : (
				<>
					<Flex
						direction='column'
						sx={{
							border: `1px solid ${dark ? '#272726' : '#DBDBDB'}`,
							width: 390,
							backgroundColor: dark ? 'black' : '#fefeff',
						}}>
						<Flex p='xl' gap='md' justify='center' align='center' direction='column'>
							<Box>
								<IconLock />
							</Box>
							<Text align='center' fw={600}>
								Trouble logging in?
							</Text>
							<Text color='#737373' align='center' fz='sm'>
								Enter your email and we&apos;ll send you a link to get back into your account.
							</Text>
							<form style={{ width: '100%' }} onSubmit={form.onSubmit(resetEmail)}>
								<TextInput
									sx={{
										width: '100%',
										'.mantine-TextInput-input': {
											backgroundColor: dark ? '#1a1a1a' : '#f5f5f5',

											border: `1px solid ${dark ? '#363636' : '#dadadb'}`,
										},
									}}
									mb='lg'
									{...form.getInputProps('email')}
									placeholder='Email'
								/>
								{errorText && (
									<Text fz='sm' align='center' color='#ED4956'>
										No users found
									</Text>
								)}
								<Button
									sx={{ '&[data-disabled]': { opacity: 0.4, backgroundColor: '#0194f6', color: 'white' } }}
									fullWidth
									radius='md'
									type='submit'
									disabled={form.values.email === ''}>
									{loading ? <Loader size='sm' /> : 'Send login link'}
								</Button>
							</form>
							{status !== 'authenticated' && (
								<>
									<Divider labelPosition='center' label='OR' sx={{ width: '100%' }} />
									<Anchor href='/register' fz='sm' fw={600} color='#262727'>
										Create new account
									</Anchor>
								</>
							)}
						</Flex>
						{status !== 'authenticated' && <BackToLoginButton />}
					</Flex>
				</>
			)}
		</>
	)
}

export default ForgotPasswordForm
