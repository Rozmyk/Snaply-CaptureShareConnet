import { Modal, Flex, TextInput, PasswordInput, Button, Checkbox, Anchor } from '@mantine/core'
import Image from 'next/image'
import { useForm } from '@mantine/form'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { signIn } from 'next-auth/react'
import LogoWhite from '../../../../../../public/logoWhite.svg'
import LogoBlack from '../../../../../../public/logoBlack.svg'
import { auth } from '@/app/firebase'
interface AccountModalProps {
	opened: boolean
	close: () => void
	dark: boolean
}
const AccountModal = ({ opened, close, dark }: AccountModalProps) => {
	const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth)

	const form = useForm({
		initialValues: {
			email: '',
			password: '',
		},
		validate: {
			email: value => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
		},
	})

	const handleSignIn = async () => {
		try {
			const res = await signIn('credentials', {
				email: form.values.email,
				password: form.values.password,
				redirect: false,
			})
			if (!res?.error) {
				close()
			}
		} catch (e) {
			console.error(e)
		}
	}

	return (
		<Modal.Root size='md' radius='15px' centered opened={opened} onClose={close}>
			<Modal.Overlay />
			<Modal.Content>
				<Modal.Header>
					<Modal.CloseButton size='lg' style={{ color: dark ? 'white' : 'black' }} />
				</Modal.Header>
				<Flex direction='column' justify='center' w={'100%'} gap='sm' p='50px' align='center'>
					<Image style={{ marginBottom: '30px' }} alt='Snaply Logo' height={50} src={dark ? LogoWhite : LogoBlack} />
					<form onSubmit={form.onSubmit(handleSignIn)}>
						<Flex direction='column' w='300px' justify='center' align='center' gap='sm'>
							<TextInput
								{...form.getInputProps('email')}
								sx={{
									input: {
										fontSize: 12,
										color: dark ? '#F5F5F5' : '#737272',
									},
									width: '100%',
									'.mantine-TextInput-input': {
										backgroundColor: dark ? '#1a1a1a' : '#f5f5f5',
										border: dark ? '1px solid #363636' : '1px solid #dadadb',
										color: '#a8a9a9',
									},
								}}
								placeholder='Email'
							/>
							<PasswordInput
								{...form.getInputProps('password')}
								placeholder='Password'
								sx={{
									input: {
										fontSize: 12,
										color: dark ? '#F5F5F5' : '#737272',
									},
									width: '100%',
									'.mantine-PasswordInput-input': {
										backgroundColor: dark ? '#1a1a1a' : '#f5f5f5',
										border: dark ? '1px solid #363636' : '1px solid #dadadb',
										color: '#a8a9a9',
									},
								}}
							/>
							<Flex justify='flex-start' w='100%'>
								<Checkbox
									color='#f8f8f8'
									sx={{
										'.mantine-Checkbox-input': {
											backgroundColor: '#f8f8f8',
										},
										'.mantine-Checkbox-icon': {
											color: 'black',
										},
									}}
									size='xs'
									label='Save login info'
								/>
							</Flex>
							<Button
								radius='md'
								type='submit'
								sx={{
									width: '100%',
									backgroundColor: '#0494f4',
									'&[data-disabled]': {
										backgroundColor: '#0494f4',
										opacity: 0.4,
										color: 'white',
									},
								}}
								disabled={form.values.email === '' || form.values.password === ''}>
								Log in
							</Button>
							<Anchor underline={false} style={{ color: dark ? '#d6e6ef' : '#00376B' }} size='xs'>
								Forgot password?
							</Anchor>
						</Flex>
					</form>
				</Flex>
			</Modal.Content>
		</Modal.Root>
	)
}

export default AccountModal
