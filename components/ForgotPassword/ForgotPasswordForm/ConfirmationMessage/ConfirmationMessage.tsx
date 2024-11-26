import { Flex, Text, Button, useMantineColorScheme } from '@mantine/core'
import { useRouter } from 'next/navigation'
interface ConfirmationMessageProps {
	email: string
}
const ConfirmationMessage = ({ email }: ConfirmationMessageProps) => {
	const router = useRouter()
	const { colorScheme } = useMantineColorScheme()
	const dark = colorScheme === 'dark'
	return (
		<Flex
			w={390}
			direction='column'
			p='lg'
			sx={{ border: `1px solid ${dark ? '#272726' : '#DBDBDB'}`, backgroundColor: dark ? 'black' : '#fefeff' }}>
			<Text mb='md' align='center' fw={600}>
				Email sent
			</Text>
			<Text mb='sm' fz='sm' c='dimmed' align='center'>
				We sent an email to <span style={{ fontWeight: 600, color: dark ? 'white' : 'black' }}>{email}</span> with a
				link to get back into your account
			</Text>
			<Button
				onClick={() => {
					router.push('/')
				}}
				variant='white'>
				OK
			</Button>
		</Flex>
	)
}

export default ConfirmationMessage
