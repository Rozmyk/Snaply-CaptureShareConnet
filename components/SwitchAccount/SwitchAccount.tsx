import { Anchor, Flex, Modal, TextInput, PasswordInput, Button, useMantineColorScheme } from '@mantine/core'
import { useSession } from 'next-auth/react'
import { useDisclosure } from '@mantine/hooks'
import Image from 'next/image'
import { useForm } from '@mantine/form'
import { signIn } from 'next-auth/react'
import { auth } from '@/app/firebase'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import LogoWhite from '../../public/logoWhite.svg'
import LogoBlack from '../../public/logoBlack.svg'
import { ReactNode } from 'react'
interface SwitchAccountProps {
	children: ReactNode
}
const SwitchAccount = ({ children }: SwitchAccountProps) => {
	const session = useSession()
	const username = session?.data?.user?.username
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth)

	const [opened, { open, close }] = useDisclosure(false)
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
				redirect: true,
				callbackUrl: '/',
			})
			close()
		} catch (e) {
			console.error(e)
		}
	}

	return (
		<>
			<Modal.Root size='md' radius='15px' centered opened={opened} onClose={close}>
				<Modal.Overlay />
				<Modal.Content sx={{ backgroundColor: dark ? '#262626' : '#fffefe' }}>
					<Modal.Header sx={{ backgroundColor: dark ? '#262626' : '#fffefe' }}>
						<Modal.CloseButton size='lg' style={{ color: colorScheme === 'dark' ? 'white' : 'black' }} />
					</Modal.Header>
					<Flex direction='column' justify='center' w={'100%'} gap='sm' p='50px' align='center'>
						<Image
							alt={`${username} profile photo`}
							style={{ marginBottom: '15px' }}
							height={50}
							src={colorScheme === 'dark' ? LogoWhite : LogoBlack}
						/>
						<form onSubmit={form.onSubmit(handleSignIn)}>
							<Flex direction='column' w='300px' justify='center' align='center' gap='sm'>
								<TextInput
									{...form.getInputProps('email')}
									sx={{
										input: {
											fontSize: 12,
											color: '#F5F5F5',
										},
										width: '100%',
										'.mantine-TextInput-input': {
											backgroundColor: dark ? '#1a1a1a' : '#f5f5f5',

											border: `1px solid ${dark ? '#363636' : '#dadadb'}`,
											color: '#a8a9a9									',
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
											color: '#F5F5F5',
										},
										width: '100%',
										'.mantine-PasswordInput-input': {
											backgroundColor: dark ? '#1a1a1a' : '#f5f5f5',

											border: `1px solid ${dark ? '#363636' : '#dadadb'}`,
											color: '#a8a9a9',
										},
									}}
								/>

								<Button
									mt='sm'
									radius='md'
									type='submit'
									sx={{
										width: '100%',
										backgroundColor: '#0494f4',
										'&[data-disabled]': {
											backgroundColor: '#0494f4',
											opacity: 0.6,
											color: 'white',
										},
									}}
									disabled={form.values.email == '' || form.values.password == ''}>
									Log in
								</Button>
								<Anchor
									href='/forgotPassword'
									underline={false}
									style={{ color: dark ? '#d6e6ef' : '#00376b' }}
									size='xs'>
									Forgot password?
								</Anchor>
							</Flex>
						</form>
					</Flex>
				</Modal.Content>
			</Modal.Root>
			<Anchor onClick={open} underline={false} component='button' sx={{ color: 'white' }}>
				{children}
			</Anchor>
		</>
	)
}

export default SwitchAccount
