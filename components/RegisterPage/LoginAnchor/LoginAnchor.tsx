import { Flex, Text, Anchor } from '@mantine/core'
const LoginAnchor = () => {
	return (
		<Flex w='100%' justify='center' align='center' direction='column' p='xl' sx={{ border: '1px solid #DBDBDB' }}>
			<Text fz='sm'>
				Have an account?{' '}
				<Anchor href='/login' fw={600} color='#0095F6'>
					Log in
				</Anchor>
			</Text>
		</Flex>
	)
}

export default LoginAnchor
